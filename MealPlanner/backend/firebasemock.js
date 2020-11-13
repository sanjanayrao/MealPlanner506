const base64 = require('base-64');

// Create user_doc to be added to users collection
var user_doc = {
    id: null,
    data: {
        "username": "", 
        "password": "",
        meals: [],
        deck: []
    }
}

//fake meal to return 
var fakeMeal = {
    id: "fakeId",
    data: {
        name: "fakeName",
        ingredients: ["fakeIngredients"],
        directions: "fakeDirections",
        servings: "fakeServings",
        username: "fakeUsername"
    }
}

var fakeMeal2 = {
    id: "fakeId2",
    data: {
        name: "fakeName",
        ingredients: ["fakeIngredients"],
        directions: "fakeDirections",
        servings: "fakeServings",
        username: "fakeUsername"
    }
}

var errorMeal = {
    id: "error"
}

/**
 * Queries the a collection with the given array of query parameters
 * 
 * @param {array[array]}    queries         An array of query parameters
 * @param {string}          collection      The name of a collection in firestore
 * 
 * @return {array[Objects]} Returns an array of each matching document 
 */

var mockCollection = {
    users: [],
    meals: []
}

export async function query_collection(queries, collection) {
    var collection_query = [];
    if(collection == "users")    {
        if ((queries[0][2] == base64.encode("pjulakanti")) && queries.length > 1 && (queries[1][2] == base64.encode("mockword"))){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("pjulakanti"),
                    password: base64.encode("mockword"),
                    meals: ["fakeId"],
                    deck: []
                }
            }];
        }
        if (queries[0][2] == base64.encode("pjulakanti")){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("pjulakanti"),
                    password: base64.encode("mockword"),
                    meals: ["fakeId"],
                    deck: []
                }
            }];
        }
        else if (queries[0][2] == base64.encode("error3")){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("error3"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if (queries[0][2] == base64.encode("error4")){
            collection_query = [{
                id: "54321",
                data: {
                    username: base64.encode("error4"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if (queries[0][2] == base64.encode("error5")){
            collection_query = [{
                id: "11111",
                data: {
                    username: base64.encode("error4"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if (queries[0][2] == base64.encode("error6")){
            collection_query = [{
                id: "11111",
                data: {
                    username: base64.encode("error6"),
                    password: base64.encode("mockword"),
                    meals: ["error"],
                    deck: []
                }
            }];
        }
        else if (queries[0][2] == base64.encode("error7")){
            collection_query = [{
                id: "error7",
                data: {
                    username: base64.encode("error7"),
                    password: base64.encode("mockword"),
                    meals: [],
                    deck: []
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("add_meal_username"))){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("pjulakanti"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("grocery_list_user"))){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("grocery_list_user"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal, fakeMeal2],
                    deck: ["fakeId2"]
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("get_meals_username"))){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("get_meal_username"),
                    password: base64.encode("get_meal_username"),
                    meals: [fakeMeal],
                    deck: ["fakeId"]
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("get_meals_username_error"))){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("pjulakanti"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("delete_user_username")) ){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("pjulakanti"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("delete_user_username2")) ){
            collection_query = [{
                id: "54321",
                data: {
                    username: base64.encode("pjulakanti"),
                    password: base64.encode("mockword"),
                    meals: [fakeMeal],
                    deck: []
                }
            }];
        }
        else if ((queries[0][2] == base64.encode("duplicate")) && queries.length > 1 && (queries[1][2] == base64.encode("user"))){
            collection_query = [{
                id: "12345",
                data: {
                    username: base64.encode("duplicate"),
                    password: base64.encode("duplicate"),
                    meals: [],
                    deck: []
                }
            },
            {
                id: "12345",
                data: {
                    username: base64.encode("duplicate"),
                    password: base64.encode("duplicate"),
                    meals: [],
                    deck: []
                }
            }];
        } 
        else if ((queries[0][2] == base64.encode("error")) && queries.length > 1 && (queries[1][2] == base64.encode("error"))) {
            throw new Error("Fake Error");;
        }
        else if ((queries[0][2] == base64.encode("error"))) {
            throw new Error("Fake Error");;
        }
    }
    else {
        if (queries[0][2] == base64.encode("get_meals_username")){
            collection_query.push(fakeMeal);
        }
        if (queries[0][2] == base64.encode("grocery_list_user")){
            collection_query.push(fakeMeal);
            collection_query.push(fakeMeal2);
        }
        if (queries[0][2] == base64.encode("get_meals_username_error")){
            throw new Error("Fake Error");
        }
        if (queries[0][2] == base64.encode("error5")){
            collection_query.push(fakeMeal);
        }
    }

    return collection_query;
}


/**
 *  Add data in a collection with the provided data at a new doc
 * 
 * @param {Object}      data             A firebase document data
 * @param {string}      collection      The name of a collection in firestore
 * 
 * @returns Returns a response object
 */
export async function add_collection(data, collection) {
    var response = {
        success: true,
        id: null
    }

    if(data.ingredients == "add_meal_ingredients_fail"){
        response.success = false;
    }

    if(data.username == base64.encode("error2") || data.username == base64.encode("error3")) {
        response.success = false;
        throw new Error("Fake Error");;
    } 
    
    if(data.username == base64.encode("error4")) {
        response.id = "54321";
    }
    else {
    }

    return response;
}


/**
 *  Updates data in the users collection with the provided data
 * 
 * @param {Object}      doc             A firebase document object
 * @param {string}      collection      The name of a collection in firestore
 * 
 * @returns Returns a response object
 */
export async function update_collection(doc, collection) {

    var response = {
        success: true
    };

    if(doc.id == "54321" || doc.id == "11111"){
        throw new Error("Fake Error");;
    }

    else if((doc.id == "12345")){
        response.success = true;
    }

    else if(doc.id == fakeMeal.id){
        response.success = true;
    }


    return response;
}


/**
 *  Deletes a document from a collection
 * 
 * @param {Object}      doc             A firebase document object
 * @param {string}      collection      The name of a collection in firebase
 * 
 * @returns Returns a response object
 */

export async function delete_collection(doc, collection) {
    if(doc.id == "11111" || doc.id == "54321" || doc.id == "error"){
        //response.success = false;
        throw new Error("Fake Error");;

    }

    if(doc.id == "error7" && collection == "users") {
        throw new Error("Fake Error");;
    }

    var response = {
        success: true,
        id: null
    };



    return response
}