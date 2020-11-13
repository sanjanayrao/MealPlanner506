import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import button from '../components/Button.android';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';



configure({ adapter: new Adapter() });

describe('button Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<button />);
    });
  });

  describe('Home Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<button />);
      expect(wrapper.find("View").length).equals(0);
 
   
    });
    });