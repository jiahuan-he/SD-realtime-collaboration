
import React from 'react';
import { shallow } from 'enzyme';
import AddParameterForm from './AddParameterForm';
describe('AddParameterForm', () => {
    it('should render correctly in "debug" mode', () => {
        const form = shallow(<AddParameterForm
            debug
        ></AddParameterForm>);
        expect(form).toMatchSnapshot();
    });
});
