
import React from 'react';
import { shallow } from 'enzyme';
import AddFlowForm from './AddFlowForm';
describe('AddFlowForm', () => {
    it('should render correctly in "debug" mode', () => {       
        const form = shallow(<AddFlowForm
            debug
        ></AddFlowForm>);
        expect(form).toMatchSnapshot();
    });
});