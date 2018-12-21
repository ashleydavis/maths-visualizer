/**
 * A row of DOM elements.
 */
import * as React from 'react';
/**
 * Specifies the alignment of children.
 */
export declare enum RowAlign {
    Start = "flex-start",
    End = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch"
}
export interface IRowProps {
    className?: string;
    alignItems?: RowAlign;
    /**
     * Maximize the size of the spacer.
     */
    max?: boolean;
    height?: string;
}
export declare class Row extends React.Component<IRowProps, {}> {
    render(): JSX.Element;
}
