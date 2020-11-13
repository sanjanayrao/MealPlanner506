import React from 'react';
import {cleanup, fireEvent} from '@testing-library/react';
import Deck from '../components/Deck';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";
import Button from '../components/Button.ios';





configure({ adapter: new Adapter() });

it("Deck Renders Same as Prior Test", () => {
    const wrapper = render(<Deck />);
    expect(wrapper).toMatchSnapshot();
  });