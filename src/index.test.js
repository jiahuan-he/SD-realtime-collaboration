import React from 'react';
import { shallow } from 'enzyme';
import Board from './index';
describe('Board', () => {
  it('should render correctly in "debug" mode', () => {
    const board = shallow(<Board debug />);  
    expect(board).toMatchSnapshot();
  });
});