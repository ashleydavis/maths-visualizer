import * as React from 'react';
import MathJax from 'react-mathjax-preview';

export interface IAppProps {
}

export interface IAppState {
}

export class AppUI extends React.Component<IAppProps, IAppState> {

    render() {
        return (
            <div>
                <div
                    id="math1"
                    >
                    <MathJax 
                        math={"`x*y`"} 
                        />
                </div>
                <div
                    id="math2"
                    >
                    <MathJax 
                        math={"`y*x`"} 
                        />
                </div>
            </div>
        );
    }
}   