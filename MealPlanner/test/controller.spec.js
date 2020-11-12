var assert = require("assert");
const controller = require('../backend/controller');

//user_login test
describe("user_login", function() {

    it("returns true if the login information is valid", function() {
      var username = "pjulakanti";
      var password = "mockword";
      let expected = controller.user_login(username, password);
      assert.equal(expected.success, true);
    });

  
  });