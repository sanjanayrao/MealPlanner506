var assert = require("assert");
const controller = require('../backend/controller');

//user login tests
describe("user_login", function() {
    it("returns false if user account already exists", async function() {
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


  //user_signup test
describe("user_signup", function() {
    it("returns an error if account information already exists", async function() {
      var username = "pjulakanti";
      var password = "mockword";
      let expected = await controller.user_signup(username, password);
      assert.equal(expected.err, 'An account with this username already exists.');
    });

    it("returns success when new user information is added", async function() {
        var username = "Brandt";
        var password = "Buchda";
        let expected = await controller.user_signup(username, password);
        assert.equal(expected.success, true);
      });

  });

//add_meal test
describe("add_meal", function() {
    it("returns an error if user could not be found", async function() {
      var username = "nonexistent";
      var name = "nonexistent";
      var ingredients = "nonexistent";
      var steps = "nonexistent";
      var servings = "nonexistent";
      let expected = await controller.add_meal(username, name, ingredients, steps, servings);
      assert.equal(expected.err, 'The user could not be found');
    });

    it("user found but meal could not be added", async function() {
        var username = "add_meal_username";
        var name = "add_meal_name";
        var ingredients = "add_meal_ingredients_fail";
        var steps = "add_meal_steps_fail";
        var servings = "add_meal_servings_fail";
        let expected = await controller.add_meal(username, name, ingredients, steps, servings);
        assert.equal(expected.success, false);
      });

    it("successfully adds meal after finding user", async function() {
        var username = "add_meal_username";
        var name = "add_meal_name";
        var ingredients = "add_meal_ingredients";
        var steps = "add_meal_steps";
        var servings = "add_meal_servings";
        let expected = await controller.add_meal(username, name, ingredients, steps, servings);
        assert.equal(expected.success, true);
      });

  });

  //get_meals test
  describe("get_meals", function() {
    it("returns false if meals belonging to user could not be found", async function() {
      var username = "add_meals_username";
      let expected = await controller.get_meals(username);
      assert.equal(expected.success, false);
    });

    //TODO fix
    /*
    it("returns true if meal successfully added", async function() {
        var username = "get_meals_username";
        let expected = await controller.get_meals(username);
        assert.equal(expected.err, true);
      });
      */
  });

      //get_deck_meals
      describe("get_deck_meals", function() {
        it("returns no meals for user without meals", async function() {
          var username = "nonexistent";
          let expected = await controller.get_deck_meals(username);
          assert.equal(expected.err, "No meals");
        });

        it("returns error for username", async function() {
            var username = "error";
            let expected = await controller.get_deck_meals(username);
            assert.equal(expected.err, "Internal Error: Unable to process request");
        });

        it("returns successfully after getting meals", async function() {
            var username = "delete_user_username";
            let expected = await controller.get_deck_meals(username);
            assert.equal(expected.success, true);
        });
        
   
    }); 

     //delete_meal test
  describe("delete_meal", function() {
    it("returns error if user could not be found", async function() {
      var username = "nonexistent";
      let expected = await controller.delete_meal(username);
      assert.equal(expected.err, "The user could not be found");
    });

    it("returns error as function can't return", async function() {
        var username = "error";
        let expected = await controller.delete_meal(username);
        assert.equal(expected.err, "Internal Error: Unable to process request");
      });

    it("update collection throws error", async function() {
        var username = "delete_user_username2";
        let expected = await controller.delete_meal(username);
        assert.equal(expected.err, "Internal Error: Unable to process request");
      });
   /* TODO:
    it("delete collection throws error", async function() {
        var username = "delete_user_username3";
        let expected = await controller.delete_meal(username);
        assert.equal(expected.err, "Internal Error: Unable to process request");
      }); */

  });

      //generate deck
      describe("generate_deck", function() {
        it("returns false on second query (no meals found)", async function() {
          var username = "nonExistence";
          var servings = "10"
          let expected = await controller.generate_deck(username, servings);
          assert.equal(expected.err, "No meals");
        });

        it("returns error on query", async function() {
            var username = "error";
            var servings = "10"
            let expected = await controller.generate_deck(username, servings);
            assert.equal(expected.err, "Internal Error: Unable to process request");
          });

          it("returns successfully", async function() {
            var username = "delete_user_username2";
            var servings = "10"
            let expected = await controller.generate_deck(username, servings);
            assert.equal(expected.success, false); //TODO: Check
          });
   
    }); 

          //get grocery list
     describe("get_grocery_list", function() {
            it("returns not found when can't find user", async function() {
              var username = "nonExistence";
              let expected = await controller.get_grocery_list(username);
              assert.equal(expected.err, "The user could not be found");
            });

            it("returns error", async function() {
                var username = "error";
                let expected = await controller.get_grocery_list(username);
                assert.equal(expected.err, "Internal Error: Unable to process request");
           });

        it("gets list successfully", async function() {
            var username = "delete_user_username";
            let expected = await controller.get_grocery_list(username);
            assert.equal(expected.success, true);
       });
       
        }); 

    //delete_all_meals
    describe("delete_all_meals", function() {
        it("returns false if user could not be found", async function() {
          var username = "nonexistent";
          let expected = await controller.delete_all_meals(username);
          assert.equal(expected.success, false);
        });

        it("catches function error", async function() {
            var username = "error";
            let expected = await controller.delete_all_meals(username);
            assert.equal(expected.success, false);
        });
   
    }); 

    //delete_user test
    describe("delete_user", function() {
        it("returns false if user could not be found", async function() {
          var username = "nonexistent";
          let expected = await controller.delete_user(username);
          assert.equal(expected.success, false);
        });

       it("returns true is user successfully deleted", async function() {
            var username = "delete_user_username";
            let expected = await controller.delete_user(username);
            assert.equal(expected.success, true);
          }); 

        it("returns false as delete collections fails", async function() {
            var username = "delete_user_username2";
            let expected = await controller.delete_user(username);
            assert.equal(expected.success, false); //TODO: figure this out
        });
    
    });


    //update meal
    describe("update_meal", function() {
        it("returns false if user could not be found", async function() {
          var username = "delete_user_username";
          var fakeMeal = {
            id: "fakeId",
            data: {
                name: "fakeName",
                ingredients: "fakeIngredients",
                directions: "fakeDirections",
                servings: "fakeServings",
                username: "fakeUsername"
            }
        }
          var meal = fakeMeal;
          let expected = await controller.update_meal(username, meal);
          assert.equal(expected.success, true);
        });
    
    });