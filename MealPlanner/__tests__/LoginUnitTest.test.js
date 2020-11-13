import React from 'react';
import {cleanup, fireEvent, findByText} from '@testing-library/react';
import Login from '../components/Login';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render  } from "enzyme";
import { expect } from 'chai';





configure({ adapter: new Adapter() });


describe('Login Test 1', () => {
  it('Checking test is able to render properly', () => {
    shallow(<Login />);
  });
});

describe('Login Test 2', () => {
  it("Checking Children Elements of Login", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("View").length).equals(1);
  });
  });

  describe('Login Test 3', () => {
    it("Checking Initial State", () => {
      const wrapper = shallow(<Login />);
      const componentInstance = wrapper.instance();
      expect(wrapper.state('username')).equals('admin');
      expect(wrapper.state('password')).equals('admin');
      expect(wrapper.state('error')).equals('');
      expect(wrapper.state('token')).equals('');

    
    });
    });

    

   

    

    




