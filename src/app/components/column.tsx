/**
 * A column of DOM elements.
 */

import * as React from 'react';

/**
 * Specifies the alignment of children.
 */
export enum ColumnAlign {
    Start = "flex-start",
    End = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch",
}

/**
 * Specifies the justification of children.
 */
export enum ColumnJustify {
    Start = "flex-start",
    End = "flex-end",
    Center = "center",
}
export interface IColumnProps {
    //
    // Class for the row.
    //
    className?: string;

    //
    // Specifies the alignment of children.
    //
    alignItems?: ColumnAlign;

    //
    // Specifies the content justification for the column.
    //
    justifyContent?: ColumnJustify;

    /**
     * Maximize the size of the spacer.
     */
    max?: boolean;

    //
    // Width of the column.
    //
    width?: string;
    
}

export class Column extends React.Component<IColumnProps, {}> {

    render() {
        let className = this.props.className;

        if (this.props.max) {
            if (!className) {
                className = "flex-grow";
            }
            else {
                className += " flex-grow";
            }
        }

        return (
            <div
                className={className} 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: this.props.alignItems || ColumnAlign.Center,
                    justifyContent: this.props.justifyContent || ColumnJustify.Center,
                    width: this.props.width,
                }}
                >
                {this.props.children}
            </div>
        );
    }
}