const assert = require('assert');
const firebase = require('../backend/firebase');

const test = require("firebase-functions-test")({
    projectId: "meal-planner-2692d";
  });

describe('firebase' , function ()  {
    it('should return an array of matching doc data given a query', () => {
        const queries = {}; //FILL
        //await then result
        return query_users(queries).then(result => {
            assert.strictEqual(result, "FILL");
        });
    });

    it('should return true on success', () => {
        const user = "Fred";
        return add_users(user).then(result => {
            assert.strictEqual(result, true);
        });
    });

    it('should return true ons success', () => {
        const user = "Fred";
        return update_users(user).then(result => {
        assert.strictEqual(result, true)
        });
    });

    it('should return true on success', () => {
        const user = "Ruby";
        return add_users(user).then(result => {
            assert.strictEqual(result, true);
        });
    });

    it('should return true ons success', () => {
        const user = "Ruby";
        return update_users(user).then(result => {
        assert.strictEqual(result, true)
        });
    });

});