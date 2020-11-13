import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import AddMeal from '../components/AddMeal';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";







configure({ adapter: new Adapter() });



it("AddMeal Renders Same as Prior Test", () => {
    const wrapper = render(<AddMeal />);
    expect(wrapper).toMatchSnapshot();
  });
  