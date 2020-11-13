import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Settings from '../components/Settings';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';



configure({ adapter: new Adapter() });

describe('Settings Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<Settings />);
    });
  });
  
  describe('Settings Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<Settings />);
      expect(wrapper.find("View").length).equals(3);
    });
    });