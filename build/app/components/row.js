"use strict";
/**
 * A row of DOM elements.
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
var RowAlign;
(function (RowAlign) {
    RowAlign["Start"] = "flex-start";
    RowAlign["End"] = "flex-end";
    RowAlign["Center"] = "center";
    RowAlign["Baseline"] = "baseline";
    RowAlign["Stretch"] = "stretch";
})(RowAlign = exports.RowAlign || (exports.RowAlign = {}));
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row.prototype.render = function () {
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
                flexDirection: "row",
                alignItems: this.props.alignItems || RowAlign.Center,
                height: this.props.height,
            } }, this.props.children));
    };
    return Row;
}(React.Component));
exports.Row = Row;
//# sourceMappingURL=row.js.map