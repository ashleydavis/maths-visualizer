import * as math from 'mathjs';
import { set, lensPath } from 'ramda';
import { rules } from './transformation-rules';
const AssignmentNode = require('mathjs/src/expression/node/AssignmentNode');

export interface IPathway {
    rule: IRule;
    nodeId: number;
    dest: IExpr;
}

export interface IExpr {
    expr: string;
    rootNode: any; //todo: type me!
    pathways: IPathway[];
}

export interface IMatcher {
    op?: string;
    type?: string;
    argIndex?: number;
    args?: IMatcher[];
    value?: any;
}

export interface IRule {
    name: string;
    def?: string;
    animation: string;
    match: IMatcher;
    apply: (node: any) => any;
}

function matchRule(matcher: IMatcher, childNode: any) { //todo: type me

    const asJSON = childNode.toJSON();

    if (matcher.op !== undefined && matcher.op !== asJSON.op) {
        //console.log("Rejected on node operator."); //fio:
        return false;
    }

    if (matcher.type !== undefined && matcher.type !== asJSON.mathjs) {
        //console.log("Rejected on node type."); //fio:
        return false;
    }

    if (matcher.value !== undefined && matcher.value !== asJSON.value) {
        //console.log("Rejected on node value."); //fio:
        return false;
    }

    if (matcher.args && matcher.args.length > 0) {
        for (const argMatcher of matcher.args) {
            const grandChildNode = childNode.args[argMatcher.argIndex!];
            if (!matchRule(argMatcher, grandChildNode)) {
                //console.log("Rejected."); //fio:
                return false;
            }
        }
    }

    console.log("Matching: ");
    console.log(matcher);
    console.log("Against:");
    console.log(JSON.stringify(childNode, null, 4)); //fio:

    console.log("!! Matched"); //fio:

    return true;
}

function walkExpressionTree(sourceExpression: IExpr, childNode: any, childPath: any[], working: any) {
    const grandChildren = childNode.args;
    if (grandChildren && grandChildren.length > 0) {
        for (let grandChildIndex = 0; grandChildIndex < grandChildren.length; ++grandChildIndex) {
            const grandChildNode = grandChildren[grandChildIndex];
            const grandChildPath = childPath.concat(["args", grandChildIndex]);
            walkExpressionTree(sourceExpression, grandChildNode, grandChildPath, working);
        }
    }
    else if (childNode.value instanceof Object) {
        const grandChildPath = childPath.concat(["value"]);
        walkExpressionTree(sourceExpression, childNode.value, grandChildPath, working);
    }

    for (const rule of rules) {
        if (matchRule(rule.match, childNode)) {
            //console.log("Got a match on rule: " + rule.name);
            //console.log("For node: " + childNode.toString()); //fio:
            const transformedNodes = rule.apply(childNode);
            for (const transformedNode of transformedNodes) {
                const childLens = lensPath(childPath);
                const newRootNode = set(childLens, transformedNode, sourceExpression.rootNode);
                const destExpr = newRootNode.toString();

                const existingDestExpression = working.expressionMap[destExpr];
                if (existingDestExpression) {
                    // Already got here through another pathway.
                    sourceExpression.pathways.push({
                        rule: rule,
                        nodeId: childNode.id,
                        dest: existingDestExpression,
                    });
                        
                    continue;
                }

                const destExpression = {
                    expr: destExpr,
                    rootNode: newRootNode,
                    pathways: [],
                }; 

                sourceExpression.pathways.push({
                    rule: rule,
                    nodeId: childNode.id,
                    dest: destExpression,
                });

                working.expressionMap[destExpression.expr] = destExpression;
                working.expressions.push(destExpression);
                working.expressionQueue.push(destExpression);
            }
        }
    }
}

export function permuteTransformations(expr: string) {

    //
    // Expressions by id.
    // Id is the text version of the expression.
    // Used to track expressions generated and break out on cycles.
    //
    const expressionMap: any = {};

    const rootNode = math.parse(expr);

    let nodeId = 0;

    function indexExpression(childNode: any) { //todo: type me
        childNode.id = ++nodeId;

        if (childNode.args) {
            for (const grandChildNode of childNode.args) {
                indexExpression(grandChildNode);
            }
        }
    }

    indexExpression(rootNode);

    console.log("**** Input:"); //fio:
    console.log(JSON.stringify(rootNode, null, 4)); //fio:

    //todo: index all the nodes!

    const initialExpr: IExpr = {
        expr: rootNode.toString(),
        rootNode: rootNode,
        pathways: [] // Transformations that connect to other expressions.
    };

    //
    // List of generating expressions, starting with original expression.
    //
    const expressions: IExpr[] = [
        initialExpr
    ];

    //
    // Track first expression.
    //
    expressionMap[initialExpr.expr] = initialExpr;

    //
    // Queue of expression yet to be transformed, starting with original node.
    //
    const expressionQueue: IExpr[] = [
        initialExpr
    ];

    while (expressionQueue.length > 0) {
        const expressionToTransform = expressionQueue.shift()!;

        walkExpressionTree(
            expressionToTransform,
            expressionToTransform.rootNode, 
            [],
            { 
                expressionMap, 
                expressions, 
                expressionQueue 
            }
        );
    }

    return expressions;    
}

/*todo:
if (require.main === module) {
    //testRun("x");
    //testRun("1");
    //testRun("x*x");
    //testRun("x*y");
    //testRun("x*y*z");
    testRun("x*1");
}

function testRun(inputExpr) {
    const expressions = permuteTransformations(inputExpr);
    console.log(JSON.stringify(expressions.map(e => ({ expr: e.expr, pathways: e.pathways })), null, 4));
}

*/