import 'jsdom-global/register';
import React from 'react';
import {  fireEvent, waitFor, screen } from '@testing-library/react'
import Settings from '../components/Settings';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render, mount  } from "enzyme";
import { expect } from 'chai';
import { Button, StyleSheet } from 'react-native';






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

    describe('Settings Test 3', () => {
      it("Checking Initial State", () => {
        const wrapper = shallow(<Settings />);
        const componentInstance = wrapper.instance();
        expect(wrapper.state('visibleDeleteUser')).equals(false);
        expect(wrapper.state('visibleLogout')).equals(false);
        expect(wrapper.state('visibleDeleteUser')).equals(false);
        expect(wrapper.state('user')).equals('');

      });
     
  });

  describe('Settings Test 4', () => {
    it("Checking State after changes to state", () => {
      const wrapper = shallow(<Settings />);
      const componentInstance = wrapper.instance();
      expect(wrapper.state('visibleDeleteUser')).equals(false);
      expect(wrapper.state('visibleLogout')).equals(false);
      expect(wrapper.state('visibleDeleteMeals')).equals(false);
      expect(wrapper.state('user')).equals('');
      
      componentInstance.setStateFalseMeals();
      expect(wrapper.state('visibleDeleteMeals')).equals(true);
      componentInstance.setStateMeals();
      expect(wrapper.state('visibleDeleteMeals')).equals(false);
      
      componentInstance.setStateUser();
      expect(wrapper.state('visibleLogout')).equals(true);
      componentInstance.setStateFalseUser();
      expect(wrapper.state('visibleLogout')).equals(false);
      
      componentInstance.setStateLogout();
      expect(wrapper.state('visibleDeleteUser')).equals(true);
      componentInstance.setStateFalseLogout();
      expect(wrapper.state('visibleDeleteUser')).equals(false);

      expect(wrapper.find('Button').exists()).equals(true)
      expect(wrapper.find('Text').exists()).equals(true)

    });  
   
});
describe('Settings Test 5', () => {
  it("Checking Initial State", () => {
    const wrapper = mount(<Settings />);
    expect(wrapper.containsMatchingElement( <Text>  Settings </Text>)).equals(false);
   
      
    
  });
 
});


