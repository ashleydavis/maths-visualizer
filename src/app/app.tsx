import * as React from 'react';
import MathJax from 'react-mathjax-preview';
import Graph from 'react-graph-vis';
import { permuteTransformations, IExpr } from './permute-transformations';

const defaultExpr = "x*y*z";

export interface IAppProps {
}

export interface IAppState {
    expr: string;
    selectedExpr: string;
    transformed: IExpr[];
}

export interface IMathsFormula {
    title: string;
    expr: string;   
}

const options = {
    //width: '600px',
    height: '800px',
    layout: {
        //improvedLayout: true,
        /*
        hierarchical: {
            enabled: true,
            direction: "LR",
        }
        */
    },
    edges: {
        color: "black"
    }
};
  
  const events = {
      select: (event: any) => {
          var { nodes, edges } = event;
          console.log(event);   
      }
  }

export class AppUI extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            expr: defaultExpr,
            selectedExpr: defaultExpr,
            transformed: permuteTransformations(defaultExpr),
        };

        this.onExprChange = this.onExprChange.bind(this);
    }

    private onExprChange(event: React.FormEvent<HTMLInputElement>) {
        const newExpr = event.currentTarget.value;
        this.setState({ 
            expr: newExpr,
            selectedExpr: newExpr,
            transformed: permuteTransformations(newExpr),
        });
    }

    flatten(arr: any[][]): any[] {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(toFlatten);
        }, []);
    }

    private buildGraph(): any {
        return {
            nodes: this.state.transformed.map(expr => {
                return {
                    id: expr.expr,
                    label: expr.expr,
                    shape: "box",
                }
            }),

            edges: this.flatten(this.state.transformed
                    .map(expr => expr.pathways
                        .map(pathway => {
                            return {
                                from: expr.expr,
                                to: pathway.dest.expr,
                                label: pathway.rule.name,
                                arrows: "to,from",
                            }
                        })
                    )
                )
        };
    }
    
    render() {

        const graph = this.buildGraph();

        return (
            <div>
                <div>
                    <input 
                        value={this.state.expr}
                        onChange={this.onExprChange} 
                        />
                </div>
                <div>
                    <MathJax 
                        math={"`" + this.state.expr + "`"}
                        />
                </div>
                <div>
                    <Graph 
                        style={{ border: "1px solid gray", }}
                        graph={graph} options={options} events={events} 
                        />
                </div>
            </div>
        );
    }
}   