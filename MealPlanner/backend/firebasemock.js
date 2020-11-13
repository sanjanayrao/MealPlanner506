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
        ingredients: "fakeIngredients",
        directions: "fakeDirections",
        servings: "fakeServings",
        username: "fakeUsername"
    }
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
    if ((queries[0][2] == base64.encode("pjulakanti")) && (queries[1][2] == base64.encode("mockword"))){
        collection_query = [{
            id: "12345",
            data: {
                username: base64.encode("pjulakanti"),
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
    else if ((queries[0][2] == base64.encode("delete_user_username3")) ){
        collection_query = [{
            id: "11111",
            data: {
                username: base64.encode("pjulakanti"),
                password: base64.encode("mockword"),
                meals: [fakeMeal],
                deck: []
            }
        }];
    }
    else if ((queries[0][2] == base64.encode("get_meals_username"))){
        collection_query = [fakeMeal];
    }
    else if ((queries[0][2] == base64.encode("duplicate")) && (queries[1][2] == base64.encode("user"))){
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
    else if ((queries[0][2] == base64.encode("error")) && (queries[1][2] == base64.encode("error"))) {
        throw "Error";
    }
    else if ((queries[0][2] == base64.encode("error"))) {
        throw "Error";
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
        success: false
    };

    if(doc.id == "54321"){
        throw "Error";
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
    if(doc.id == "11111"){
        //response.success = false;
        throw "Error";

    }
    var response = {
        success: true,
        id: null
    };



    return response
}