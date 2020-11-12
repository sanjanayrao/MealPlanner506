import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Home from '../components/Home';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";



configure({ adapter: new Adapter() });

//Test that checks if component is Null
describe('Home', () => {
  it('is not null', () => {
    expect(Home).not.toBeNull();
  });
});

describe('Home', () => {
    it('Checking  if it renders', () => {
      shallow(<Home />);
    });
  });
