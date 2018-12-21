"use strict";
/**
 * A container component that centers it's content on screen.
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
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className, style: {
                height: this.props.height,
                width: this.props.width || "90%",
                maxWidth: this.props.maxWidth,
                margin: "0 auto",
            } }, this.props.children));
    };
    return Container;
}(React.Component));
exports.Container = Container;
//# sourceMappingURL=container.js.map