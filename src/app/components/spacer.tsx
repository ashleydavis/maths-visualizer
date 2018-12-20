/**
 * Put a space between elements.
 */

import * as React from 'react';

const defaultSize = 10;

export interface ISpacerProps {
    /**
     * Size of the space.
     */
    size?: number;

    /**
     * Maximize the size of the spacer.
     */
    max?: boolean;

    /**
     * Make the spacer 2x size.
     */
    x2?: boolean;
}

export class Spacer extends React.Component<ISpacerProps, {}> {

    render() {
        var parent = (this as any)._reactInternalInstance._currentElement; //._owner._instance;
        console.log(parent); //fio:

        let size =  this.props.size !== undefined
            ? this.props.size
            : defaultSize;

        if (this.props.x2) {
            size *= 2;
        }

        const style: any = {};

        if (this.props.max) {
            return (
                <div className="flex-grow" />
            );
        }
        else {
            style.width = size.toString() + "px";
        }

        return (
            <div 
                style={style}
                >
            </div>
        );
    }
}