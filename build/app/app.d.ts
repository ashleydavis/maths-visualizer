import * as React from 'react';
export interface IAppProps {
}
export interface IAppState {
}
export interface IMathsFormula {
    title: string;
    expr: string;
}
export declare class AppUI extends React.Component<IAppProps, IAppState> {
    render(): JSX.Element;
}
