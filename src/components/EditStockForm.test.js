import React from 'react';
import { shallow } from 'enzyme';
import EditStockForm from './EditStockForm';
describe('EditStockForm', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": ["stock1", "stock2"],
        };
        const form = shallow(<EditStockForm
            stockIDs={props.stockIDs}
            debug
        ></EditStockForm>);
        expect(form).toMatchSnapshot();
    });
});

describe('EditStockForm', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": [],
        };
        const form = shallow(<EditStockForm
            stockIDs={props.stockIDs}
            debug
        ></EditStockForm>);
        expect(form).toMatchSnapshot();
    });
});