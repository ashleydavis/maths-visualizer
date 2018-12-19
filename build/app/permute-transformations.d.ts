export interface IPathway {
    rule: string;
    nodeId: number;
    dest: IExpr;
}
export interface IExpr {
    rule: IRule;
    expr: string;
    rootNode: any;
    pathways: IPathway[];
}
export interface IMatcher {
    op?: string;
    type?: string;
    argIndex?: number;
    args?: IMatcher[];
    value?: any;
}
export interface IRule {
    name: string;
    def?: string;
    animation: string;
    match: IMatcher;
    apply: (node: any) => any;
}
export declare function permuteTransformations(expr: string): IExpr[];
