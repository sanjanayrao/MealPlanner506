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
    describe('AddMeal Test 3', () => {
      it("Checking Initial State", () => {
        const wrapper = shallow(<AddMeal />);
        const componentInstance = wrapper.instance();
        expect(wrapper.state('ingredients')).equals('');
        expect(wrapper.state('steps')).equals('');
        expect(wrapper.state('servings')).equals('');
        expect(wrapper.state('user')).equals('');

    
      });
      });

      describe('AddMeal Test 3', () => {
        it("Checking Initial State", () => {
          const wrapper = shallow(<AddMeal />);
          const componentInstance = wrapper.instance();
          expect(wrapper.state('ingredients')).equals('');
          expect(wrapper.state('steps')).equals('');
          expect(wrapper.state('servings')).equals('');
          expect(wrapper.state('user')).equals('');

          componentInstance.setIngredients('sugar and salt');
          expect(wrapper.state('ingredients')).equals('sugar and salt');

          componentInstance.setSteps('mix together');
          expect(wrapper.state('steps')).equals('mix together');

          componentInstance.setServings('4');
          expect(wrapper.state('servings')).equals('4');

          componentInstance.setUser('tester');
          expect(wrapper.state('user')).equals('tester');


  
      
        });
        });
    