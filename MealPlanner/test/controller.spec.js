var assert = require("assert");
const controller = require('../backend/controller');

//user_login test
describe("user_login", function() {
    it("returns true if the login information is correct", async function() {
      var username = "pjulakanti";
      var password = "mockword";
      let expected = await controller.user_login(username, password);
      assert.equal(expected.success, true);
    });

    it("returns false if the login information is incorrect", async function() {
        var username = "bad";
        var password = "bad";
        let expected = await controller.user_login(username, password);
        assert.equal(expected.success, false);
    });

    it("returns false if the login information is invalid", async function() {
        var username = "ba   d";
        var password = "ba   d";
        let expected = await controller.user_login(username, password);
        assert.equal(expected.success, false);
    });

    it("returns false if the login information finds multiple users", async function() {
        var username = "duplicate";
        var password = "user";
        let expected = await controller.user_login(username, password);
        assert.equal(expected.success, false);
    });

    it("returns false if the login information fails", async function() {
        var username = "fail";
        var password = "fail";
        let expected = await controller.user_login(username, password);
        assert.equal(expected.success, false);
    });
  });