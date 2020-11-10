/**
 * !This file is for testing purposes only and should not be built with the application
 * 
 */


const assert = require('assert');
const firebase = require('../backend/firebase');
import * as fb from '../backend/firebase';

const test = require("firebase-functions-test")({
    projectId: "meal-planner-2692d"
});

describe('firebase' , function ()  {
    it('should return an array of matching doc data given a query', () => {
        const queries = {}; //FILL
        //await then result
        return fb.query_users(queries).then(result => {
            assert.strictEqual(result, "FILL");
        });
    });
});
