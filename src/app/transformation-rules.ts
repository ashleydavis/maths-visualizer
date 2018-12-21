import { IRule } from "./permute-transformations";
const ConstantNode = require('mathjs/src/expression/node/ConstantNode');
import { assert } from 'chai';

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

];
