const assert = require('assert');
const firebase = require('../backend/firebase');

describe('firebase' , function ()  {
    it('should return an array of matching doc data given a query', function() {
        const queries = {}; //FILL
        let result = query_users(queries);
        assert.strictEqual(result, "FILL");
    });

    it('should return true on success', function() {
        const user = "";
        let result = add_users(user);
        assert.strictEqual(result, true);
    });

    it('should return true ons success', function(){
        const user = ""
        let result = update_users(user);
        assert.strictEqual(result, true)
    });

});