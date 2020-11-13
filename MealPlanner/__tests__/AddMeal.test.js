import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import AddMeal from '../components/AddMeal';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';



configure({ adapter: new Adapter() });

describe('AddMeal Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<AddMeal />);
    });
  });
  
  describe('AddMeal Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<AddMeal />);
      expect(wrapper.find("View").length).equals(1);
    });
    });