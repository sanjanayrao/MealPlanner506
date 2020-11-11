/**
 * !This file is for testing purposes only and should not be built with the application
 * 
 */



import * as fb from '../backend/firebase';
import base64 from 'base-64';

const chai = require('chai');
const charAsPromised = require('chai-as-promised');
chai.use(charAsPromised);

var should = chai.should();
var assert = require("assert");


describe('firebase.query_collection()' , function ()  {
    it('should return an array of matching documents given a valid user query', async function() {
        const queries = [["username", "==", base64.encode("admin")],["password", "==", base64.encode("admin")]];
        const result = await fb.query_collection(queries,"users"); 
        assert.equal(result.length, 1);
    });
});
