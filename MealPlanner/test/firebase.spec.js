/**
 * !This file is for testing purposes only and should not be built with the application
 * 
 */

import * as fb from '../backend/firebase';
import base64 from 'base-64';

const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "meal-planner-2692d";

describe('Firebase functions', () => {

    let myFunctions;

    before(() => {

      myFunctions = require('../backend/firebase');
    });

    after(() => {
        // Do cleanup tasks.
        test.cleanup();

    });

    describe('firebase.query_collection()' , function ()  {
        it('should return an array of matching documents given a valid user query', async function() {
            const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
            const testDoc = db.collection("users").doc("helpme")
            await firebase.assertSucceeds(testDoc.get());
        });
    });

})


