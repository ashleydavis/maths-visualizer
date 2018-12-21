"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantNode = require('mathjs/src/expression/node/ConstantNode');
var chai_1 = require("chai");
function copyInstance(original) {
    var copied = Object.assign(Object.create(Object.getPrototypeOf(original)), original);
    return copied;
}
exports.rules = [
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
        apply: function (node) {
            chai_1.assert(node.args.length === 2);
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
        apply: function (node) {
            chai_1.assert(node.args.length === 2);
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
        apply: function (node) {
            chai_1.assert(node.args.length === 2);
            return [node.args[0]];
        },
    },
    {
        name: "commutative property of multiplication",
        def: "http://www.coolmath.com/prealgebra/06-properties/02-properties-commutative-multiplication-02",
        match: {
            op: "*",
        },
        apply: function (node) {
            chai_1.assert(node.args.length === 2);
            var reversed = copyInstance(node);
            reversed.args = [
                node.args[1],
                node.args[0],
            ];
            return [reversed];
        },
        animation: "swap_2",
    },
];
//# sourceMappingURL=transformation-rules.js.map