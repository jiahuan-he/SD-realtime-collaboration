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
            id: "stock0",
            stockValue: 0,
            x: 50,
            y: 50,
        }
        const stock = mount(<svg>
            <Stock
                key={props.id}
                stockID={props.id}
                stockValue={props.stockValue}
                x={props.x}
                y={props.y}
            debug
            ></Stock></svg>, { attachTo: window.domNode });
        expect(stock).toMatchSnapshot();
    });
});