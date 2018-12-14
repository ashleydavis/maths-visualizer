import * as React from 'react';
import MathJax from 'react-mathjax-preview';

export interface IAppProps {
}

export interface IAppState {
}

export interface IMathsFormula {
    title: string;
    expr: string;   
}

export class AppUI extends React.Component<IAppProps, IAppState> {
    
    render() {

        const formulas: IMathsFormula[] = [
            {
                title: "commutative property of multiplication",
                expr: "`y*x`",
            }    
        ];

        return (
            <div>
                <div><input value="x*y" onChange={() => {}} /></div>
                <div><MathJax math="`x*y`" /></div>
                {formulas.map((formula, index) => 
                    <div key={index}>
                        <div>{index+1} {formula.title}</div>
                        <MathJax math={formula.expr} />
                    </div>
                )}
            </div>
        );
    }
}   