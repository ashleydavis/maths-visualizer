/**
 * Put a space between elements.
 */
import * as React from 'react';
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
export declare class Spacer extends React.Component<ISpacerProps, {}> {
    render(): JSX.Element;
}
