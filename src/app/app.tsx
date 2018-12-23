import * as React from 'react';
import MathJax from 'react-mathjax-preview';
import Graph from 'react-graph-vis';
import { permuteTransformations, IExpr } from './permute-transformations';
import { Container } from './components/container';
import { Row, RowAlign } from './components/row';
import { Column, ColumnAlign } from './components/column';
import { Card, InputGroup, FormGroup } from '@blueprintjs/core';
import * as lodash from 'lodash';
const html2canvas = require('html2canvas');

//const defaultExpr = "x*y*z";
const defaultExpr = "E = m*c^2";
//const defaultExpr = "a + b = b + a";

export interface IAppProps {
}

export interface IAppState {
    expr: string;
    selectedExpr: string;
    transformed: IExpr[];
    graph: any;
    testImageCapture?: string;
}

const options = {
    autoResize: true,
    layout: {
        improvedLayout: true,
    },
    edges: {
        color: "black"
    }
};
  
export class AppUI extends React.Component<IAppProps, IAppState> {

    formulaRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAppProps) {
        super(props);

        const transformed = permuteTransformations(defaultExpr);
        this.state = {
            expr: defaultExpr,
            selectedExpr: defaultExpr,
            transformed: transformed,
            graph: this.buildGraph(transformed),
        };

        this.onExprChange = this.onExprChange.bind(this);
        this.rebuildGraph = lodash.debounce(this.rebuildGraph.bind(this), 1000);
        this.formulaRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        setTimeout(() => {
            html2canvas(this.formulaRef.current)
                .then((canvas: HTMLCanvasElement) => {
                    //document.body.appendChild(canvas);
                    var data = canvas.toDataURL('image/png');
                    var src = encodeURI(data);
                    this.setState({
                        testImageCapture: src,
                    });
                });        
        }, 1000); //TODO: Is there an event when Mathjax has rendered?
    }

    private rebuildGraph() {
        this.setState({ 
            transformed: permuteTransformations(this.state.expr),
            graph: this.buildGraph(this.state.transformed),
        });
    }

    private onExprChange(event: React.FormEvent<HTMLInputElement>) {
        const newExpr = event.currentTarget.value;
        this.setState(
            { 
                expr: newExpr,
                selectedExpr: newExpr,
            }, 
            () => this.rebuildGraph()
        );
    }

    flatten(arr: any[][]): any[] {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(toFlatten);
        }, []);
    }

    private buildGraph(transformed: IExpr[]): any {
        return {
            nodes: transformed.map(expr => {
                return {
                    id: expr.expr,
                    label: expr.expr,
                    shape: "box",
                }
            }),

            edges: this.flatten(transformed
                    .map(expr => expr.pathways
                        .map(pathway => {
                            return {
                                from: expr.expr,
                                to: pathway.dest.expr,
                                label: pathway.rule.shortName,
                                arrows: "to,from",
                            }
                        })
                    )
                )
        };
    }
    
    render() {

        const events = {
            select: (event: any) => {
                var { nodes, edges } = event;
                console.log(event);   

                if (nodes && nodes.length > 0) {
                    this.setState({ selectedExpr: nodes[0] });
                }
            }
        }


        return (
            <div
                className="pt-8 h-screen"
                >
                <Container
                    className="mt-8 h-full"
                    maxWidth="80%"                    
                    >
                    <Card 
                        style={{
                            height: "95%",
                        }}
                        >
                        <Row 
                            className="h-full"
                            alignItems={RowAlign.Start}
                            >
                            <Column
                                alignItems={ColumnAlign.Start}
                                width="300px"
                                >
                                <FormGroup
                                    label={"Enter formula"}
                                    labelFor="formula-input"
                                    >
                                    <InputGroup 
                                        id="formula-input" 
                                        large
                                        placeholder="Enter a formula to evaluate" 
                                        value={this.state.expr}
                                        onChange={this.onExprChange} 
                                        autoFocus
                                        />
                                </FormGroup>
                                <div className="w-full mt-8">
                                    <div>Input</div>
                                    <Card className="mt-2 mr-8">
                                        <MathJax 
                                            math={"`" + this.state.expr + "`"}
                                            />
                                    </Card>
                                </div>
                                <div className="w-full mt-8">
                                    <div>Selected</div>
                                    <Card 
                                        className="mt-2 mr-8"
                                        >
                                        <div
                                            ref={this.formulaRef}
                                            >
                                            <MathJax 
                                                math={"`" + this.state.selectedExpr + "`"}
                                                />
                                        </div>
                                    </Card>
                                </div>

                                <div className="w-full mt-8">
                                    <div>Test capture</div>
                                    <img src={this.state.testImageCapture} />
                                </div>
                            </Column>

                            <Column
                                className="h-full"
                                max
                                >
                                <Graph 
                                    style={{ 
                                        border: "1px solid lightgray", 
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    graph={this.state.graph} 
                                    options={options} 
                                    events={events} 
                                    />
                            </Column>
                        
                        </Row>
                    </Card>

                </Container>
            </div>
        );
    }
}   