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
  
  describe('Signup Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<Signup />);
      expect(wrapper.find("View").length).equals(1);
    });
    });

    describe('Signup Test 3', () => {
        it("Checking Initial State", () => {
          const wrapper = shallow(<Signup />);
          const componentInstance = wrapper.instance();
          expect(wrapper.state('username')).equals('');
          expect(wrapper.state('password')).equals('');
          expect(wrapper.state('error')).equals('');

        });
    });

    describe('Signup Test 4', () => {
      it("Checking State after changing value", () => {
        const wrapper = shallow(<Signup />);
        const componentInstance = wrapper.instance();
        expect(wrapper.state('username')).equals('');
        expect(wrapper.state('password')).equals('');
        expect(wrapper.state('error')).equals('');
        componentInstance.setUserName('tester')
        expect(wrapper.state('username')).equals('tester');
        componentInstance.setPassword('password')
        expect(wrapper.state('password')).equals('password');
        componentInstance.setPassword('error')
        expect(wrapper.state('password')).equals('error');

      });
  });
    