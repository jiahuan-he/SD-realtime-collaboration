import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
describe('Board', () => {
    it('should render correctly in "debug" mode', () => {

        const props = {
            "arrows": [{
                "from": "a",
                "to": "f"
            }],
            "flows": [{
                "dependencies": ["a"],
                "equation": "-1",
                "from": "a",
                "id": "f",
                "to": "b"
            }],
            "stocks": [{
                "dependencies": ["a", "f"],
                "equation": "-f",
                "id": "a",
                "initValue": 100,
                "posX": 57,
                "posY": 242,
                "value": 0
            }, {
                "dependencies": ["b", "f"],
                "equation": "+f",
                "id": "b",
                "initValue": 0,
                "posX": 288,
                "posY": 245,
                "value": 0
            }],
            "cloudsOrigin":[],
            "cloudsDestination":[],
            "parameters":[],
            "stockBeingEdited":null
        }
        const board = shallow(<Board
            stocks={props.stocks}
            flows={props.flows}
            arrows={props.arrows}
            parameters={props.parameters}
            cloudsOrigin={props.cloudsOrigin}
            cloudsDestination={props.cloudsDestination}
            stockBeingEdited={props.stockBeingEdited}
            debug
        ></Board>);
        expect(board).toMatchSnapshot();
    });
});