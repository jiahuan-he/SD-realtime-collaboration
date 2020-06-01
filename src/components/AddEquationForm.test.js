
import React from 'react';
import { shallow } from 'enzyme';
import AddEquationForm from './AddEquationForm';
describe('AddEquationForm', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stocks": [{
                "dependencies": ["tank1", "flow"],
                "equation": "-flow",
                "id": "tank1",
                "initValue": 100,
                "posX": 55,
                "posY": 217,
                "value": 100
            }, {
                "dependencies": ["tank2", "flow"],
                "equation": "+flow",
                "id": "tank2",
                "initValue": 0,
                "posX": 347,
                "posY": 241,
                "value": 0
            }, {
                "dependencies": ["tank3"],
                "equation": "",
                "id": "tank3",
                "initValue": 0,
                "posX": 11,
                "posY": 17,
                "value": 0
            },],
            "flows": [{
                "dependencies": ["rate"],
                "equation": "rate",
                "from": "tank1",
                "id": "flow",
                "to": "tank2"
            },],
            "arrows": [{
                "from": "rate",
                "to": "flow"
            }], "parameters": [{
                "name": "rate",
                "posX": 257,
                "posY": 351,
                "value": 1
            }],
        };
        const form = shallow(<AddEquationForm
            debug
        ></AddEquationForm>);
        expect(form).toMatchSnapshot();
    });
});
