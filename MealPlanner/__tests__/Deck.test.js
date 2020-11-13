import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Deck from '../components/Deck';

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure,  } from "enzyme";
import { expect } from 'chai';



configure({ adapter: new Adapter() });


describe('Deck Test 1', () => {
    it('Checking  if it renders', () => {
      shallow(<Deck />);
    });
  });
  
  describe('Deck Test 2', () => {
    it("Checking Children Elements of Login", () => {
      const wrapper = shallow(<Deck />);
      expect(wrapper.find("View").length).equals(2);
    });
    });

    describe('Deck Test 3', () => {
        it("Checking Initial State", () => {
          const wrapper = shallow(<Deck />);
          const componentInstance = wrapper.instance();
          expect(wrapper.state('servings')).equals('4');
          expect(wrapper.state('user')).equals('');
      
        });
        });
        