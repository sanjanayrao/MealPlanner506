import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import Meal from '../components/Meals';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";
import Button from '../components/Button.ios';





configure({ adapter: new Adapter() });

it("Meal Renders Same as Prior Test", () => {
    const wrapper = render(<Meal />);
    expect(wrapper).toMatchSnapshot();
  });