import { IRule } from "./permute-transformations";
const ConstantNode = require('mathjs/src/expression/node/ConstantNode');
import { assert } from 'chai';
import * as math from 'mathjs';

function copyInstance (original: any) {
    var copied = Object.assign(
      Object.create(
        Object.getPrototypeOf(original)
      ),
      original
    );
    return copied;
}

export const rules: IRule[] = [
    {
        name: "multiply constants",
        
        match: {
            op: "*",
            args: [
                {
                    argIndex: 0,
                    type: "ConstantNode",
                },
                {
                    argIndex: 1,
                    type: "ConstantNode",
                },
            ],
        },

        animation: "merge_2",

        apply: (node: any) => { //todo: type me
            assert(node.args.length === 2);
            return new ConstantNode(node.args[0].value * node.args[1].value);
        },
    },
    
    {
        name: "multiply by identity",
        
        match: {
            op: "*",
            args: [
                {
                    argIndex: 0,
                    type: "ConstantNode",
                    value: 1,
                },
            ],
        },

        animation: "drop_0",

        apply: (node: any) => { //todo: type me
            assert(node.args.length === 2);
            return [node.args[1]];
        },
    },

    {
        name: "multiply by identity",
        
        match: {
            op: "*",
            args: [
                {
                    argIndex: 1,
                    type: "ConstantNode",
                    value: 1,
                }
            ],
        },

        animation: "drop_1",

        apply: (node: any) => { //todo: type me!
            assert(node.args.length === 2);
            return [node.args[0]];
        },
    },
    
    {
        name: "commutative property of multiplication",
        def: "http://www.coolmath.com/prealgebra/06-properties/02-properties-commutative-multiplication-02",
        
        match: {
            op: "*",
        },

        apply: (node: any) => { //todo: type me
            assert(node.args.length === 2);

            const reversed = copyInstance(node);
            reversed.args = [
                node.args[1],
                node.args[0],
            ]
            return [reversed];
        },

        animation: "swap_2",
    },

    {
        name: "constant exponent converts to multiplication",
        
        match: {
            op: "^",
            args: [
                {
                    argIndex: 1,
                    type: "ConstantNode",
                },
            ],
        },

        apply: (node: any) => { //todo: type me
            console.log("***********************8"); //fio:     

            let base = node.args[0].toString();
            let exponent = node.args[1].value;
            console.log("exponent: " + exponent); //fio:
            if (exponent === 0) {
                return 1;
            }

            let newExpr = "";
            while (exponent--) {
                if (newExpr.length > 0) {
                    newExpr += "*";
                }
                newExpr += base;
            }

            console.log("new expr: " + newExpr); //fio:
            console.log(math.parse(newExpr)); //fio:

            return [math.parse(newExpr)];
        },

        animation: "collapse_2",
    },
];
