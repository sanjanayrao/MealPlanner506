import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import Login from '../components/Login';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";
import Button from '../components/Button.ios';





configure({ adapter: new Adapter() });

it("renders Account header", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });