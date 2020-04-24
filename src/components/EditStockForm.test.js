import React from 'react';
import { shallow } from 'enzyme';
import EditStockForm from './EditStockForm';
describe('EditStockForm', () => {
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
            }]
        }
        const form = shallow(<EditStockForm
            stocks={props.stocks}
            debug
        ></EditStockForm>);
        expect(form).toMatchSnapshot();
    });
});
