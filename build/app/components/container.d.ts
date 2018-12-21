/**
 * A container component that centers it's content on screen.
 */
import * as React from 'react';
export interface IContainerProps {
    className?: string;
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
export declare class Container extends React.Component<IContainerProps, {}> {
    render(): JSX.Element;
}
