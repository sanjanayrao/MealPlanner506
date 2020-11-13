import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import ListVar from '../components/List';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';




configure({ adapter: new Adapter() });

describe('ListVar Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<ListVar />);
    });
  });
  
  describe('ListVar Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<ListVar />);
      expect(wrapper.find("View").length).equals(1);
    });
    });
    