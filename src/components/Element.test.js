import React from 'react';
import { mount } from 'enzyme'
import Element from './Element'
// Avoid Warning: render(): Rendering components directly into document.body is discouraged.
beforeAll(() => {
    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);
  })

describe('Element', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            id: "stock0",
            stockValue: 0,
            x: 50,
            y: 50,
        }
        const element = mount(<svg>
            <Element
                key={props.id}
                stockID={props.id}
                stockValue={props.stockValue}
                x={props.x}
                y={props.y}
            debug
            ></Element></svg>, { attachTo: window.domNode });
        expect(element).toMatchSnapshot();
    });
});