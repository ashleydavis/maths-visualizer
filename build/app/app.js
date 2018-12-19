"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_mathjax_preview_1 = require("react-mathjax-preview");
var react_graph_vis_1 = require("react-graph-vis");
var permute_transformations_1 = require("./permute-transformations");
var graph = {
    nodes: [
        {
            id: 1,
            label: 'x * y',
            shape: "box",
        },
        {
            id: 2,
            label: 'y * x',
            shape: "box",
        },
    ],
    edges: [
        {
            from: 1,
            to: 2,
            label: "commutative\r\nproperty of\r\nmultiplication",
            arrows: "to,from",
        },
    ]
};
var options = {
    width: '600px',
    height: '300px',
    layout: {
    //improvedLayout: true,
    /*
    hierarchical: {
        enabled: true,
        direction: "LR",
    }
    */
    },
    edges: {
        color: "black"
    }
};
var events = {
    select: function (event) {
        var nodes = event.nodes, edges = event.edges;
        console.log(event);
    }
};
var AppUI = /** @class */ (function (_super) {
    __extends(AppUI, _super);
    function AppUI(props) {
        var _this = _super.call(this, props) || this;
        var defaultExpr = "x*y";
        _this.state = {
            expr: defaultExpr,
            transformed: permute_transformations_1.permuteTransformations(defaultExpr),
        };
        _this.onExprChange = _this.onExprChange.bind(_this);
        return _this;
    }
    AppUI.prototype.onExprChange = function (event) {
        var newExpr = event.currentTarget.value;
        this.setState({
            expr: newExpr,
            transformed: permute_transformations_1.permuteTransformations(newExpr),
        });
    };
    AppUI.prototype.render = function () {
        var formulas = [
            {
                title: "commutative property of multiplication",
                expr: "`y*x`",
            }
        ];
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("input", { value: this.state.expr, onChange: this.onExprChange })),
            React.createElement("div", null,
                React.createElement(react_mathjax_preview_1.default, { math: "`" + this.state.expr + "`" })),
            this.state.transformed.map(function (transformed, index) {
                return React.createElement("div", { key: index },
                    React.createElement("div", null, index + 1),
                    React.createElement(react_mathjax_preview_1.default, { math: transformed.expr }));
            }),
            React.createElement("div", null,
                React.createElement(react_graph_vis_1.default, { style: { border: "1px solid gray", }, graph: graph, options: options, events: events }))));
    };
    return AppUI;
}(React.Component));
exports.AppUI = AppUI;
//# sourceMappingURL=app.js.map