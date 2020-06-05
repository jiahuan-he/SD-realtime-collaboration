import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { SimulationData } from '../model';
const colors = [
    "48466d",
    "3d84a8",
    "e84545",
    "00b8a9",
    "ffde7d",
    "6639a6",
    "ff7e67",
    "769fcd",
    "a56cc1",
    "9e579d"
]

export const Chart: React.FC<{simulationData: SimulationData, XAxisDataKey: string}> = ({simulationData, XAxisDataKey}) => {
    const lines = Object.keys(simulationData[0])
    .filter(key => key !== XAxisDataKey)
    .map((key,i) => <Line key={i} type="monotone" dataKey={key} stroke={"#"+colors[i%colors.length]} />);
    return <LineChart
        width={500}
        height={300}
        data={simulationData}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={XAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines}
    </LineChart>
}