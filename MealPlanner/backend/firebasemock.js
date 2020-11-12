
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
    if ((queries[0][2] == "pjulakanti") && (queries[1][2] == "mockword")){
        collection_query = ["Pranav"];
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
        success: false,
        id: null
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
;
    var response = {
        success: false,
        id: null
    };

    response.success = true;
    return response
}