import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Login from '../components/Login';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";



configure({ adapter: new Adapter() });


describe('Login Test 1', () => {
  it('Component is loaded and not null', () => {
    expect(Login).not.toBeNull();
    
  });
});

describe('Login Test 2', () => {
  it('Checking test is able to render properly', () => {
    shallow(<Login />);
  });
});

describe('Login Test 3', () => {
  it("Checking Children Elements of Login", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("View").length).toEqual(1);
  });
  });




