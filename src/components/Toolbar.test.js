import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from './Toolbar';
describe('Toolbar', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": ["stock1", "stock2"],
        };
        const toolbar = shallow(<Toolbar
            stockIDs={props.stockIDs}
            debug
        ></Toolbar>);
        expect(toolbar).toMatchSnapshot();
    });
});

describe('Toolbar', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": [],
        };
        const toolbar = shallow(<Toolbar
            stockIDs={props.stockIDs}
            debug
        ></Toolbar>);
        expect(toolbar).toMatchSnapshot();
    });
});