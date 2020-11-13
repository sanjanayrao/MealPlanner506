import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import Signup from '../components/Signup';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";
import Button from '../components/Button.ios';





configure({ adapter: new Adapter() });

it("Signup Renders Same as Prior Test", () => {
    const wrapper = render(<Signup />);
    expect(wrapper).toMatchSnapshot();
  });