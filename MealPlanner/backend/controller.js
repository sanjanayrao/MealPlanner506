import * as fb from './firebase'
import base64 from 'base-64'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import * as helper from './helper'
import { add } from 'react-native-reanimated';

const invalid_login = 'Invalid Username or Password';
const internal_error = 'Internal Error: Unable to process request';

/**
 * Checks if the provided login information is valid
 * 
 * @param {string} username 
 * @param {string} password
 * 
 * @returns Returns true if the login information is valid
 */
export async function user_login(username, password) {
    var response = {success: false, err: ''};

    // Check username and password format
    if(helper.check_string(username) || helper.check_string(password)){
        response.err = invalid_login;
        return response;
    }

    // Encode username and password
    var encoded_username = base64.encode(username.trim())
    var encoded_password = base64.encode(password.trim())

    // Search users collection for matching doc
    await fb.query_collection([["username", "==", encoded_username],["password", "==", encoded_password]], "users")
    .then(function(result) {
        // A single match was found (successful login)
        if(result.length == 1) {
            response.success = true;
        } 
        // Multiple matching user doc (VERY BAD!!)
        else if (result.length != 0) {
            console.error("Error duplicate users: ", result);
        } 
        // No match was found (failed login)
        else {
            response.err = invalid_login;
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
    })

    return response
}

export async function user_signup(username, password) {
    var response = {success: false, err: ''};

    // Check username and password format
    if(helper.check_string(username) || helper.check_string(password)){
        response.err = invalid_login;
        return response;
    }

    // Encode username and password
    var encoded_username = base64.encode(username.trim())
    var encoded_password = base64.encode(password.trim())

    // Check if user already exists
    await fb.query_collection([["username", "==", encoded_username],["password", "==", encoded_password]], "users")
    .then(function(result) {
        if(result.length != 0) {
            response.err = 'An account with this username already exists.'
        } else {
		}
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
	})
	
	if(response.err != '') 
		return response;

    // Create user_doc to be added to users collection
    var user_doc = {
        id: null,
        data: {
            "username": encoded_username, 
            "password": encoded_password,
            meals: [],
            deck: []
        }
    }

    // Add new doc with autogenerated ID
    await fb.add_collection(user_doc.data, "users")
    .then(function(result) {
        response.success = result.success;
        user_doc.id = result.id;
    })
    .catch(function(error) {
        console.error("Error adding user: ", error);
        login.err = internal_error;
    })

    if(!response.success)
        response.err = internal_error;

    return response;
}

export async function add_meal(username, name, ingredients, steps, servings) {
    var response = {
        success: false,
        err: '',
        id: null
    };

    var user_doc = {};

    // Encode username and password
    var encoded_username = base64.encode(username)

    // Check if the users exits
    await fb.query_collection([["username", "==", encoded_username]], "users")
    .then(function(result) {
        if(result.length != 1) {
            response.err = 'The user could not be found';
            response.success = false;
        } else {
            response.success = true;
            user_doc = result[0];
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
        response.success = false;
    })
    
    if(!response.success) 
        return response;

    // Create the Meal Object

    var meal = {
        name: name,
        ingredients: ingredients,
        directions: steps,
        servings: servings ,
        username: encoded_username
    }

    // Add meal to the collection
    await fb.add_collection(meal, "meals")
    .then(function(result) {
        response.success = result.success;
        response.id = result.id;
    })
    .catch(function(error) {
        console.error("Error adding meal: ", error);
        response.err = internal_error;
        response.success = false;
    })

    if(!response.success)
        return response;

    // Add meal ID to user's list
    user_doc.data.meals.push(response.id)


    // Update user doc in collection
    await fb.update_collection(user_doc, "users")
    .then(function(result) {
        response.success = result.success;
    })
    .catch(function(error) {
        console.error("Error updating user meal list: ", error);
        response.err = internal_error;
        response.success = false;
    })

    return response;
}

export async function get_meals(username) {
    var response = {
        success: false, 
        err: '',
        meals: []
    };

    // Encode username and password
    var encoded_username = base64.encode(username.trim())

    // Search meals collection for meals attached to user
    await fb.query_collection([["username", "==", encoded_username]], "meals")
    .then(function(result) {
        // A single match was found (successful login)
        if(result.length == 0) {
            response.success = false;
            response.err = "No meals"
        } else {
            response.success = true;
            result.forEach(meal_doc => {
                var meal = {}
                meal.id = meal_doc.id;
                meal.name = meal_doc.data.name;
                meal.ingredients = meal_doc.data.ingredients.join(",");
                meal.steps = meal_doc.data.directions;
                meal.servings = meal_doc.data.servings;
                meal.username = meal_doc.data.username;
                response.meals.push(meal);
            });
        }
    })
    .catch(function(error) {
        console.error("Error querying user meals: ", error);
        response.err = internal_error;
    })

    return response;
}

export async function get_deck_meals(username) {
    var response = {
        success: false, 
        err: '',
        meals: []
    };

    // Encode username and password
    var encoded_username = base64.encode(username.trim())

    // Search deck collection for deck meals attached to user
    await fb.query_collection([["username", "==", encoded_username]], "meals")
    .then(function(result) {
        // A single match was found (successful login)
        if(result.length == 0) {
            response.success = false;
            response.err = "No meals"
        } else {
            response.success = true;
            result.forEach(meal_doc => {
                console.log(meal_doc)
                var meal = {}
                meal.id = meal_doc.id;
                meal.name = meal_doc.data.name;
                meal.ingredients = meal_doc.data.ingredients.join(",");
                meal.steps = meal_doc.data.directions;
                meal.servings = meal_doc.data.servings;
                meal.username = meal_doc.data.username;
                response.meals.push(meal);
            });
        }
    })
    .catch(function(error) {
        console.error("Error querying user meals: ", error);
        response.err = internal_error;
    })

    return response;
}

export async function delete_meal(username, id) {
    var response = {
        success: false,
        err: '',
        id: null
    };

    var user_doc = {};

    // Encode username and password
    var encoded_username = base64.encode(username)

    // Check if the users exits
    await fb.query_collection([["username", "==", encoded_username]], "users")
    .then(function(result) {
        if(result.length != 1) {
            response.err = 'The user could not be found';
            response.success = false;
        } else {
            response.success = true;
            user_doc = result[0];
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
        response.success = false;
    })
    
    if(!response.success) 
        return response;

    // Delete from meals collection
    await fb.delete_collection({id: id}, "meals")
    .then(function(result) {
        response.success = result.success;
    })
    .catch(function(error) {
        console.error("Error deleting meal: ", error);
        response.err = internal_error;
        response.success = false;
    })

    if(!response.success)
        return response

    // Delete from user meals list
    var index = user_doc.data.meals.indexOf(id);
    var meals = []
    if(index > -1)
        meals = user_doc.data.meals.splice(index,1);

    user_doc.data.meals = meals
    
    // Update user meals in users collection
    await fb.update_collection(user_doc, "users")
    .then(function(result) {
        response.success = result.success;
    })
    .catch(function(error) {
        console.error("Error deleting meal: ", error);
        response.err = internal_error;
        response.success = false;
    })

    return response
}

export async function generate_deck(username, servings) {
    var response = {
        success: false,
        err: '',
        deck: null
    };

    var user_doc = {};

    // Encode username and password
    var encoded_username = base64.encode(username)

    // Check if the users exits
    await fb.query_collection([["username", "==", encoded_username]], "users")
    .then(function(result) {
        if(result.length != 1) {
            response.err = 'The user could not be found';
            response.success = false;
        } else {
            response.success = true;
            user_doc = result[0];
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
        response.success = false;
    })

    var user_meals = [];

    // Get all user meals
    await fb.query_collection([["username", "==", encoded_username]], "meals")
    .then(function(result) {
        if(result.length == 0) {
            response.err = "No meals";
            response.success = false;
        } else {
            user_meals = result;
            response.success = true;
        }
    })
    .catch(function(error) {
        console.error("Error querying meals: ", error);
        response.err = internal_error;
        response.success = false;
    })

    if(!response.success)
        return response;

    // Generate a deck list
    var deck = [];
    var user_deck = [];
    var num_servings = 0;

    helper.shuffleArray(user_meals);
 
    for (let i = 0; i < user_meals.length && num_servings < parseInt(servings); i++) {
        deck.push(user_meals[i].data);
        user_deck.push(user_meals[i].id);
        num_servings += parseInt(user_meals[i].data.servings);
    }

    // Add deck list to users doc
    user_doc.data.deck = user_deck;

    console.log(user_doc);

    // Update user doc in users collection
    await fb.update_collection(user_doc, "users")
    .then(function(result) {
        response.success = true;
    })
    .catch(function(error) {
        console.error("Error updating user doc: ", error);
        response.err = internal_error;
        response.success = false;
    })

    if(response.success) 
        response.deck = deck;

    return response
}

export async function get_grocery_list(username) {
    var response = {
        success: false,
        err: '',
        list: []
    };

    var user_doc = {};

    // Encode username and password
    var encoded_username = base64.encode(username)

    // Check if the users exits
    await fb.query_collection([["username", "==", encoded_username]], "users")
    .then(function(result) {
        if(result.length != 1) {
            response.err = 'The user could not be found';
            response.success = false;
        } else {
            response.success = true;
            user_doc = result[0];
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
        response.success = false;
    })

    if(!response.success)
        return success;
        
    var user_meals = [];

    // Get all users meals
    await get_meals(username)
    .then(function(result) {
        response.success = true;
        user_meals = result.meals;
    })

    user_meals.forEach(meal => {
        response.list.push(helper.string_to_array(meal.ingredients))
    });

    return response;
}

export async function delete_all_meals(username) {
    var response = {
        success: false,
        err: '',
    };

    var user_doc = {};

    // Encode username and password
    var encoded_username = base64.encode(username)

    // Check if the users exits
    await fb.query_collection([["username", "==", encoded_username]], "users")
    .then(function(result) {
        if(result.length != 1) {
            response.err = 'The user could not be found';
            response.success = false;
        } else {
            response.success = true;
            user_doc = result[0];
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        response.err = internal_error;
        response.success = false;
    })
    
    if(!response.success) 
        return response;
    for (let i = 0; i < user_doc.data.meals.length; i++) {
            
        // Delete from meals collection
        await fb.delete_collection({id: user_doc.data.meals[i]}, "meals")
        .then(function(result) {
            response.success = result.success;
        })
        .catch(function(error) {
            console.error("Error deleting meal: ", error);
            response.err = internal_error;
            response.success = false;
        });

        if(!response.success)
            return response

        // Delete from user meals list
        var index = user_doc.data.meals.indexOf(id);
        var meals = []
        if(index > -1)
            meals = user_doc.data.meals.splice(index,1);

        user_doc.data.meals = meals
        
        // Update user meals in users collection
        await fb.update_collection(user_doc, "users")
        .then(function(result) {
            response.success = result.success;
        })
        .catch(function(error) {
            console.error("Error deleting meal: ", error);
            response.err = internal_error;
            response.success = false;
        });
    }

    return response
}

// TODO
export async function delete_user(user){
    var response = {
        success: false,
        err: '',
    };
    await delete_all_meals(user)

}

export async function update_meal(username, name, ingredients, steps, servings, id){
    var response = {
        success: false,
        err: '',
        id: null
    };

    // Encode username and password
    var encoded_username = base64.encode(username)

    // Create meal doc
    var meal_doc = {}
    meal_doc.id = id;
    meal_doc.data = {};
    meal_doc.data.username = encoded_username;
    meal_doc.data.name = name;
    meal_doc.ingredients = ingredients;
    meal_doc.servings = servings;
    meal_doc.directions = steps;

    await fb.update_collection(meal_doc, "meals")
    .then(function(result) {
        response.success = result.success;
    })
    .catch(function(error) {
        console.error("Error updating meal: ", error);
        response.err = internal_error;
        response.success = false;
    })

    return response;
}