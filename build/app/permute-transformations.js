"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math = require("mathjs");
var ramda_1 = require("ramda");
function matchRule(matcher, childNode) {
    //console.log("Matching: ");
    //console.log(matcher);
    //console.log("Against:");
    //console.log(JSON.stringify(childNode, null, 4)); //fio:
    var asJSON = childNode.toJSON();
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
        for (var _i = 0, _a = matcher.args; _i < _a.length; _i++) {
            var argMatcher = _a[_i];
            var grandChildNode = childNode.args[argMatcher.argIndex];
            if (!matchRule(argMatcher, grandChildNode)) {
                //console.log("Rejected."); //fio:
                return false;
            }
        }
    }
    //console.log("!! Matched"); //fio:
    return true;
}
function walkExpressionTree(sourceExpression, childNode, childPath, working) {
    var grandChildren = childNode.args;
    if (grandChildren && grandChildren.length > 0) {
        for (var grandChildIndex = 0; grandChildIndex < grandChildren.length; ++grandChildIndex) {
            var grandChildNode = grandChildren[grandChildIndex];
            var grandChildPath = childPath.concat(["args", grandChildIndex]);
            walkExpressionTree(sourceExpression, grandChildNode, grandChildPath, working);
        }
    }
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        if (matchRule(rule.match, childNode)) {
            //console.log("Got a match on rule: " + rule.name);
            //console.log("For node: " + childNode.toString()); //fio:
            var transformedNodes = rule.apply(childNode);
            for (var _a = 0, transformedNodes_1 = transformedNodes; _a < transformedNodes_1.length; _a++) {
                var transformedNode = transformedNodes_1[_a];
                var childLens = ramda_1.lensPath(childPath);
                var newRootNode = ramda_1.set(childLens, transformedNode, sourceExpression.rootNode);
                var destExpr = newRootNode.toString();
                var existingDestExpression = working.expressionMap[destExpr];
                if (existingDestExpression) {
                    // Already got here through another pathway.
                    sourceExpression.pathways.push({
                        rule: rule,
                        nodeId: childNode.id,
                        dest: existingDestExpression,
                    });
                    continue;
                }
                var destExpression = {
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
function permuteTransformations(expr) {
    //
    // Expressions by id.
    // Id is the text version of the expression.
    // Used to track expressions generated and break out on cycles.
    //
    var expressionMap = {};
    var rootNode = math.parse(expr);
    var nodeId = 0;
    function indexExpression(childNode) {
        childNode.id = ++nodeId;
        if (childNode.args) {
            for (var _i = 0, _a = childNode.args; _i < _a.length; _i++) {
                var grandChildNode = _a[_i];
                indexExpression(grandChildNode);
            }
        }
    }
    indexExpression(rootNode);
    //console.log("**** Input:"); //fio:
    //console.log(JSON.stringify(rootNode, null, 4)); //fio:
    //todo: index all the nodes!
    var initialExpr = {
        expr: rootNode.toString(),
        rootNode: rootNode,
        pathways: [] // Transformations that connect to other expressions.
    };
    //
    // List of generating expressions, starting with original expression.
    //
    var expressions = [
        initialExpr
    ];
    //
    // Track first expression.
    //
    expressionMap[initialExpr.expr] = initialExpr;
    //
    // Queue of expression yet to be transformed, starting with original node.
    //
    var expressionQueue = [
        initialExpr
    ];
    while (expressionQueue.length > 0) {
        var expressionToTransform = expressionQueue.shift();
        walkExpressionTree(expressionToTransform, expressionToTransform.rootNode, [], {
            expressionMap: expressionMap,
            expressions: expressions,
            expressionQueue: expressionQueue
        });
    }
    return expressions;
}
exports.permuteTransformations = permuteTransformations;
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
//# sourceMappingURL=permute-transformations.js.map