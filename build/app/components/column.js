"use strict";
/**
 * A column of DOM elements.
 */
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
/**
 * Specifies the alignment of children.
 */
var ColumnAlign;
(function (ColumnAlign) {
    ColumnAlign["Start"] = "flex-start";
    ColumnAlign["End"] = "flex-end";
    ColumnAlign["Center"] = "center";
    ColumnAlign["Baseline"] = "baseline";
    ColumnAlign["Stretch"] = "stretch";
})(ColumnAlign = exports.ColumnAlign || (exports.ColumnAlign = {}));
/**
 * Specifies the justification of children.
 */
var ColumnJustify;
(function (ColumnJustify) {
    ColumnJustify["Start"] = "flex-start";
    ColumnJustify["End"] = "flex-end";
    ColumnJustify["Center"] = "center";
})(ColumnJustify = exports.ColumnJustify || (exports.ColumnJustify = {}));
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.prototype.render = function () {
        var className = this.props.className;
        if (this.props.max) {
            if (!className) {
                className = "flex-grow";
            }
            else {
                className += " flex-grow";
            }
        }
        return (React.createElement("div", { className: className, style: {
                display: "flex",
                flexDirection: "column",
                alignItems: this.props.alignItems || ColumnAlign.Center,
                justifyContent: this.props.justifyContent || ColumnJustify.Center,
                width: this.props.width,
            } }, this.props.children));
    };
    return Column;
}(React.Component));
exports.Column = Column;
//# sourceMappingURL=column.js.map