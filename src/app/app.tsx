import * as React from 'react';
import MathJax from 'react-mathjax-preview';
import Graph from 'react-graph-vis';
import { permuteTransformations, IExpr } from './permute-transformations';
import { Container } from './components/container';
import { Row, RowAlign } from './components/row';
import { Column, ColumnAlign } from './components/column';
import { Card, InputGroup, FormGroup } from '@blueprintjs/core';
import * as lodash from 'lodash';
import { CaptureEquation } from './capture-formula';
const html2canvas = require('html2canvas');

//const defaultExpr = "x*y*z";
const defaultExpr = "E = m*c^2";
//const defaultExpr = "a + b = b + a";

export interface IAppProps {
}

export interface IAppState {
    loading: boolean,
    expr: string;
    selectedExpr: string;
    transformed: IExpr[];
    graph?: any;
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

export interface IEquationImageCache {
    [index: string]: string;
}
  
export class AppUI extends React.Component<IAppProps, IAppState> {

    equationImageCache: IEquationImageCache = {};
    cachedImages: number = 0;

    constructor(props: IAppProps) {
        super(props);

        const transformed = permuteTransformations(defaultExpr);
        this.state = {
            loading: true,
            expr: defaultExpr,
            selectedExpr: defaultExpr,
            transformed: transformed,
        };

        this.onExprChange = this.onExprChange.bind(this);
        this.rebuildGraph = lodash.debounce(this.rebuildGraph.bind(this), 1000);
    }

    componentDidMount() {
    }

    onCacheEquationImage(expr: string, image: string) {
        console.log("Cached image for " + expr + ": " + image);

        this.equationImageCache[expr] = image;
        ++this.cachedImages;

        if (this.cachedImages >= this.state.transformed.length) {
            // Done caching images.
            // Time to build the graph.
            this.setState({
                loading: false,
                graph: this.buildGraph(this.state.transformed),
            });
        }
    }

    private rebuildGraph() { //todo: this needs to trigger recaching the images
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
            nodes: transformed.map((expr, i) => {
                return {
                    id: expr.expr,
                    shape: "image",
                    image: this.equationImageCache[expr.expr],
                };
            }),

            edges: this.flatten(transformed
                    .map(expr => expr.pathways
                        .map(pathway => {
                            return {
                                from: expr.expr,
                                to: pathway.dest.expr,
                                // Need to be able to select edges to see the label.
                                //todo: label: pathway.rule.shortName,
                                arrows: "to,from",
                                length: 300,
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

        if (this.state.loading) {
            console.log("Loading..."); 
            //
            // When loading render and capture rendered equations.
            //
            return (
                <Column>
                    {this.state.transformed.map((expr, index) => 
                        <CaptureEquation
                            key={expr.expr}
                            equation={expr.expr}
                            onCapture={image => this.onCacheEquationImage(expr.expr, image)}
                            />
                    )}
                </Column>
            );
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
                                <div>
                                    <div>Selected</div>
                                    <div>
                                        <MathJax 
                                            math={"`" + this.state.selectedExpr + "`"}
                                            />
                                    </div>
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