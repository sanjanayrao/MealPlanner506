import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import List from '../components/List';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";
import Button from '../components/Button.ios';





configure({ adapter: new Adapter() });

it("List Renders Same as Prior Test", () => {
    const wrapper = render(<List />);
    expect(wrapper).toMatchSnapshot();
    
  });