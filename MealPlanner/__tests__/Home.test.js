import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Home from '../components/Home';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';



configure({ adapter: new Adapter() });

describe('Home Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<Home />);
    });
  });
  
  describe('Home Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find("View").length).equals(2);
    });
    });
