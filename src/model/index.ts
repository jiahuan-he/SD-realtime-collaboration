// import Flow from "../components/Flow"
export interface I_Identifiable{
    id: string,
}

export interface I_Positionable extends I_Identifiable{
    posX: number,
    posY: number,
}

export interface I_Arrow{
    from:string,
    to:string,
}

export interface I_Flow{
    equation:string,
    from:string,
    id:string,
    to:string,
    dependencies: Array<string>
}

export interface I_Parameter extends I_Positionable{
    name: string,
    value: number,
}

interface I_SimulationStep{
    [index:string]: number
}
export type SimulationData = Array<I_SimulationStep>

export interface I_Stock extends I_Positionable{
    dependencies: Array<string>,
    equation: string,
    initValue: number,
    value: number,
}

export interface I_Cloud extends I_Positionable{
    flow: string,
    flowFrom: string,
    flowTo: string,
}

export interface I_Pos{
    x: number,
    y: number,
}