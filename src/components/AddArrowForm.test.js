import React from 'react';
import { shallow } from 'enzyme';
import AddArrowForm from './AddArrowForm';
describe('AddArrowForm', () => {
    it('should render correctly in "debug" mode', () => {
        const form = shallow(<AddArrowForm
            debug
        ></AddArrowForm>);
        expect(form).toMatchSnapshot();
    });
});
