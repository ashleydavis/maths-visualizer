"use strict";
/**
 * Put a space between elements.
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
var defaultSize = 10;
var Spacer = /** @class */ (function (_super) {
    __extends(Spacer, _super);
    function Spacer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spacer.prototype.render = function () {
        var parent = this._reactInternalInstance._currentElement; //._owner._instance;
        console.log(parent); //fio:
        var size = this.props.size !== undefined
            ? this.props.size
            : defaultSize;
        if (this.props.x2) {
            size *= 2;
        }
        var style = {};
        if (this.props.max) {
            return (React.createElement("div", { className: "flex-grow" }));
        }
        else {
            style.width = size.toString() + "px";
        }
        return (React.createElement("div", { style: style }));
    };
    return Spacer;
}(React.Component));
exports.Spacer = Spacer;
//# sourceMappingURL=spacer.js.map