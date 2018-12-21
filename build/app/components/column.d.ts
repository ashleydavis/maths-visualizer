/**
 * A column of DOM elements.
 */
import * as React from 'react';
/**
 * Specifies the alignment of children.
 */
export declare enum ColumnAlign {
    Start = "flex-start",
    End = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch"
}
/**
 * Specifies the justification of children.
 */
export declare enum ColumnJustify {
    Start = "flex-start",
    End = "flex-end",
    Center = "center"
}
export interface IColumnProps {
    className?: string;
    alignItems?: ColumnAlign;
    justifyContent?: ColumnJustify;
    /**
     * Maximize the size of the spacer.
     */
    max?: boolean;
    width?: string;
}
export declare class Column extends React.Component<IColumnProps, {}> {
    render(): JSX.Element;
}
