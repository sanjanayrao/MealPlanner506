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
    describe('Home Test 3', () => {
        it("Checking Initial State", () => {
          const wrapper = shallow(<Home />);
          const componentInstance = wrapper.instance();
          expect(wrapper.state('showLogin')).equals(false);
          expect(wrapper.state('showSignup')).equals(false);

        });
    });

    describe('Home Test 4', () => {
        it("Checking Initial State and Changing State", () => {
          const wrapper = shallow(<Home />);
          const componentInstance = wrapper.instance();
          expect(wrapper.state('showLogin')).equals(false);
          expect(wrapper.state('showSignup')).equals(false);
          componentInstance.showLogin();
          expect(wrapper.state('showLogin')).equals(true);
          expect(wrapper.state('showSignup')).equals(false);
          componentInstance.hideLogin();
          expect(wrapper.state('showLogin')).equals(false);
          expect(wrapper.state('showSignup')).equals(false);
          componentInstance.showSignup();
          expect(wrapper.state('showLogin')).equals(false);
          expect(wrapper.state('showSignup')).equals(true);
          componentInstance.hideSignup();
          expect(wrapper.state('showLogin')).equals(false);
          expect(wrapper.state('showSignup')).equals(false);

        });
    });
