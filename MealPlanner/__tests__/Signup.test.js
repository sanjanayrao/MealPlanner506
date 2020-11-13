import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import SignUp from '../components/Signup';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';
import Signup from '../components/Signup';



configure({ adapter: new Adapter() });

describe('Signup Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<SignUp />);
    });
  });
  
  describe('Sigup Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<Signup />);
      expect(wrapper.find("View").length).equals(1);
    });
    });