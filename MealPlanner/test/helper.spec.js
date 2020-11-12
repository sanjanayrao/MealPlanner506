
var assert = require("assert");
import {string_to_array} from '../backend/helper.js';
const helper = require('../backend/helper');


describe("string_to_array", function() {

    it("returns an array with single element \"first\"", function() {
      var test1 = ["first"];
      
      assert.equal(helper.string_to_array("first"), test1[0]);
    });
  
    it("returns an array with two elements [first, second]", function(){

        let expected = helper.string_to_array("first,second"); //check that list is passed in without spaces
        assert.equal(expected[1], "second");
    });
  
  });

describe("array_to_string", function(){

    it("returns a string \"first\" when passing in array", function() {

        var test2 = ["first"];
        let expected = helper.array_to_string(test2)
        assert.equal(test2[0], expected);
    });
});

//makes sure no white space
describe("check_string", function(){

    it("returns true when passed an empty string", function() {

        var str = "";
        let expected = helper.check_string(str);
        assert.equal(expected, true);
    });
    
    it("returns true when passed an string with space", function() {

        var str2 = "the hello";
        let expected = helper.check_string(str2);
        assert.equal(expected, true);
    });
    
    it("returns false when passed an string without space", function() {

        var str3 = "goodby";
        let expected = helper.check_string(str3);
        assert.equal(expected, false);
    }); 
});


describe("shuffleArray", function(){

    it("returns a shuffled array given an array", function() {

        var shuffleArr = ["first", "second", "third"];
        let expected = helper.shuffleArray(shuffleArr);
        var index1 = shuffleArr.indexOf("first");
        var index2 = shuffleArr.indexOf("second");
        var index3 = shuffleArr.indexOf("third");
        assert.notEqual(index1, -1);
        assert.notEqual(index2, -1);
        assert.notEqual(index3, -1);
    });
});