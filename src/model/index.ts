import Flow from "../components/Flow"

export interface Arrow{
    from:string,
    to:string,
}

export interface Flow{
    equation:string,
    from:string,
    id:string,
    to:string,
}

export interface Parameter{
    id: string,
    name: string,
    posX: number,
    posY: number,
    value: number,
}

interface SimulationStep{
    [index:string]: number
}
export type SimulationData = Array<SimulationStep>

export interface Stock{
    dependencies: Array<string>,
    equation: string,
    id: string,
    initValue: number,
    posX: number,
    posY: number,
    value: number,
}

export interface Cloud{
    flow: string,
    flowFrom: string,
    flowTo: string,
    posX: number,
    posY: number,
}

