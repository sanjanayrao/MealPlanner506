import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Meals from '../components/Meals';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';



configure({ adapter: new Adapter() });

describe('Meals Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<Meals />);
    });
  });
  
  describe('Meals Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<Meals />);
      expect(wrapper.find("View").length).equals(2);
    });
    });