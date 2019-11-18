import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
describe('Board', () => {
    it('should render correctly in "debug" mode', () => {
        const props = {
            "stockIDs": ["stock1", "stock2"],
            "stockPos": {
                "stock1": {
                    "x": 157,
                    "y": 188
                },
                "stock2": {
                    "x": 316,
                    "y": 90
                }
            },
            "stockValues": {
                "stock1": 0,
                "stock2": 0,
            }
        }
        const board = shallow(<Board
            stockIDs={props.stockIDs}
            stockPos={props.stockPos}
            stockValues={props.stockValues}
            debug
        ></Board>);
        expect(board).toMatchSnapshot();
    });
});