import React from 'react';
import { shallow } from 'enzyme';
import AddStockForm from './AddStockForm';
describe('AddStockForm', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": ["stock1", "stock2"],
        };
        const form = shallow(<AddStockForm
            stockIDs={props.stockIDs}
            debug
        ></AddStockForm>);
        expect(form).toMatchSnapshot();
    });
});

describe('AddStockForm', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": [],
        };
        const form = shallow(<AddStockForm
            stockIDs={props.stockIDs}
            debug
        ></AddStockForm>);
        expect(form).toMatchSnapshot();
    });
});