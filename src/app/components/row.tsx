/**
 * A row of DOM elements.
 */

import * as React from 'react';

/**
 * Specifies the alignment of children.
 */
export enum RowAlign {
    Start = "flex-start",
    End = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch",
}

export interface IRowProps {
    //
    // Class for the row.
    //
    className?: string;

    //
    // Specifies the alignment of children.
    //
    alignItems?: RowAlign;

    /**
     * Maximize the size of the spacer.
     */
    max?: boolean;

    //
    // Height of the row.
    //
    height?: string;
}

export class Row extends React.Component<IRowProps, {}> {

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
                    flexDirection: "row",
                    alignItems: this.props.alignItems || RowAlign.Center,
                    height: this.props.height,
                }}
                >
                {this.props.children}
            </div>
        );
    }
}