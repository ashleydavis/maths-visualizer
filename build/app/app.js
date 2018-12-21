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
var container_1 = require("./components/container");
var row_1 = require("./components/row");
var column_1 = require("./components/column");
var core_1 = require("@blueprintjs/core");
var lodash = require("lodash");
//const defaultExpr = "x*y*z";
var defaultExpr = "E = mc^2";
var options = {
    autoResize: true,
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
var AppUI = /** @class */ (function (_super) {
    __extends(AppUI, _super);
    function AppUI(props) {
        var _this = _super.call(this, props) || this;
        var transformed = permute_transformations_1.permuteTransformations(defaultExpr);
        _this.state = {
            expr: defaultExpr,
            selectedExpr: defaultExpr,
            transformed: transformed,
            graph: _this.buildGraph(transformed),
        };
        _this.onExprChange = _this.onExprChange.bind(_this);
        _this.rebuildGraph = lodash.debounce(_this.rebuildGraph.bind(_this), 1000);
        return _this;
    }
    AppUI.prototype.rebuildGraph = function () {
        this.setState({
            transformed: permute_transformations_1.permuteTransformations(this.state.expr),
            graph: this.buildGraph(this.state.transformed),
        });
    };
    AppUI.prototype.onExprChange = function (event) {
        var _this = this;
        var newExpr = event.currentTarget.value;
        this.setState({
            expr: newExpr,
            selectedExpr: newExpr,
        }, function () { return _this.rebuildGraph(); });
    };
    AppUI.prototype.flatten = function (arr) {
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(toFlatten);
        }, []);
    };
    AppUI.prototype.buildGraph = function (transformed) {
        return {
            nodes: transformed.map(function (expr) {
                return {
                    id: expr.expr,
                    label: expr.expr,
                    shape: "box",
                };
            }),
            edges: this.flatten(transformed
                .map(function (expr) { return expr.pathways
                .map(function (pathway) {
                return {
                    from: expr.expr,
                    to: pathway.dest.expr,
                    label: pathway.rule.name,
                    arrows: "to,from",
                };
            }); }))
        };
    };
    AppUI.prototype.render = function () {
        var _this = this;
        var events = {
            select: function (event) {
                var nodes = event.nodes, edges = event.edges;
                console.log(event);
                if (nodes && nodes.length > 0) {
                    _this.setState({ selectedExpr: nodes[0] });
                }
            }
        };
        return (React.createElement("div", { className: "pt-8 h-screen" },
            React.createElement(container_1.Container, { className: "mt-8 h-full", maxWidth: "80%" },
                React.createElement(core_1.Card, { style: {
                        height: "95%",
                    } },
                    React.createElement(row_1.Row, { className: "h-full", alignItems: row_1.RowAlign.Start },
                        React.createElement(column_1.Column, { alignItems: column_1.ColumnAlign.Start, width: "300px" },
                            React.createElement(core_1.FormGroup, { label: "Enter formula", labelFor: "formula-input" },
                                React.createElement(core_1.InputGroup, { id: "formula-input", large: true, placeholder: "Enter a formula to evaluate", value: this.state.expr, onChange: this.onExprChange, autoFocus: true })),
                            React.createElement("div", { className: "w-full mt-8" },
                                React.createElement("div", null, "Input"),
                                React.createElement(core_1.Card, { className: "mt-2 mr-8" },
                                    React.createElement(react_mathjax_preview_1.default, { math: "`" + this.state.expr + "`" }))),
                            React.createElement("div", { className: "w-full mt-8" },
                                React.createElement("div", null, "Selected"),
                                React.createElement(core_1.Card, { className: "mt-2 mr-8" },
                                    React.createElement(react_mathjax_preview_1.default, { math: "`" + this.state.selectedExpr + "`" })))),
                        React.createElement(column_1.Column, { className: "h-full", max: true },
                            React.createElement(react_graph_vis_1.default, { style: {
                                    border: "1px solid lightgray",
                                    width: "100%",
                                    height: "100%",
                                }, graph: this.state.graph, options: options, events: events })))))));
    };
    return AppUI;
}(React.Component));
exports.AppUI = AppUI;
//# sourceMappingURL=app.js.map