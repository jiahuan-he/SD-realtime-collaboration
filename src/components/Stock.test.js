import React from 'react';
import { mount } from 'enzyme'
import Stock from './Stock'
// Avoid Warning: render(): Rendering components directly into document.body is discouraged.
beforeAll(() => {
    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);
})

describe('Stock', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stock": {
                id: "stock0",
                initValue: 0,
                posX: 50,
                posY: 50,
            }
        }
        const stock = mount(<svg>
            <Stock
                stock={props.stock}
                debug
            ></Stock></svg>, { attachTo: window.domNode });
        expect(stock).toMatchSnapshot();
    });
});