import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import Settings from '../components/Settings';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";




configure({ adapter: new Adapter() });

it("Settings Renders Same as Prior Test", () => {
    const wrapper = render(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });

  