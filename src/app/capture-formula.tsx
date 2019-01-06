//
//  A React component to capture an equation to an image.
//

import * as React from 'react';
import MathJax from 'react-mathjax-preview';
const html2canvas = require('html2canvas');

export interface ICaptureEquationProps {
    //
    // The equation to render.
    //
    equation: string;

    //
    // Callback function when the image has been rendered.
    //
    onCapture: (image: string) => void;
}

export interface ICaptureEquationState {
}

export class CaptureEquation extends React.Component<ICaptureEquationProps, ICaptureEquationState> {

    formulaRef: React.RefObject<HTMLDivElement>;

    constructor(props: ICaptureEquationProps) {
        super(props);

        this.state = {
        };

        this.formulaRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        setTimeout(() => { //TODO: Is the time out needed?
            const options = {
                backgroundColor: null,
            };
            html2canvas(this.formulaRef.current, options)
                .then((canvas: HTMLCanvasElement) => {
                    var data = canvas.toDataURL('image/png');
                    var src = encodeURI(data);
                    this.props.onCapture(src);
                });        
        }, 1000); //TODO: Is there an event when Mathjax has rendered?
    }
    
    render() {
        console.log("Capture Formula: " + this.props.equation); //fio:
        return (
            <div
                ref={this.formulaRef}
                style={{
                    border: "1px solid black",
                    borderRadius: 5,
                    padding: 5,
                }}
                >
                <MathJax 
                    math={"`" + this.props.equation + "`"}
                    />
            </div>
        );
    }
}