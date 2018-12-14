import * as React from 'react';
import MathJax from 'react-mathjax-preview';
import Graph from 'react-graph-vis';

export interface IAppProps {
}

export interface IAppState {
}

export interface IMathsFormula {
    title: string;
    expr: string;   
}

const graph = {
    nodes: [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
      ],
    edges: [
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5}
      ]
  };
  
    const options = {
        width: '600px',
        height: '300px',
        layout: {
            improvedLayout:true,
            hierarchical: {
                enabled: true,
                direction: "LR",
            }
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