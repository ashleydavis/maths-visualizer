/**
 * A container component that centers it's content on screen.
 */

import * as React from 'react';

export interface IContainerProps {
    //
    // Class for the containers.
    //
    className?: string;

    //
    // Height of the container
    //
    height?: string;
    
    /**
     * Specifies the width of the container.
     */
    width?: string;

    /**
     * Specifies the maximum width of the container.
     */
    maxWidth?: string;
}

export class Container extends React.Component<IContainerProps, {}> {

    render() {
        return (
            <div
                className={this.props.className}
                style={{
                    height: this.props.height,
                    width: this.props.width || "90%",
                    maxWidth: this.props.maxWidth,
                    margin: "0 auto",
                }}
                >
                {this.props.children}
            </div>
        );
    }
}