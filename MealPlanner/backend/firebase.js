const firebase = require("firebase");
require("firebase/firestore");

var firebase_config = {
    apiKey: "AIzaSyDRCnGnTx85iTkSaI9aMI168sQ81NpcwmA",
    authDomain: "meal-planner-2692d.firebaseapp.com",
    databaseURL: "https://meal-planner-2692d.firebaseio.com",
    projectId: "meal-planner-2692d",
    storageBucket: "meal-planner-2692d.appspot.com",
    messagingSenderId: "327517910029",
    appId: "1:327517910029:web:a062770fb43ea4b428d144",
    measurementId: "G-X1STGXH62T"
};

export default !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();

const db = firebase.firestore();

const __DEBUG__ = false;


/**
 * Queries the a collection with the given array of query parameters
 * 
 * @param {array[array]}    queries         An array of query parameters
 * @param {string}          collection      The name of a collection in firestore
 * 
 * @return {array[Objects]} Returns an array of each matching document 
 */
export async function query_collection(queries, collection) {
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("QUERYING", collection, "COLLECTION");
        console.debug("QUERY PARAMETERS:\n", queries);
    }

    // Filter document reference for each query parameter
    var collection_ref = db.collection(collection);
    queries.forEach(query => {
        collection_ref = collection_ref.where(query[0], query[1], query[2]);
    });

    var collection_query = [];

    // Retrieve filtered data
    await collection_ref.get()
    .then(function(query_snapshot) {
        query_snapshot.forEach(function(doc) {
            collection_query.push({"id": doc.id, "data": doc.data()})
        })
    })
    .catch(function(error) {
        console.error("Error retrieving document: ", error);
    });

    if(__DEBUG__) {
        console.debug("QUERY DATA:\n", collection_query);
        console.debug("--END DEBUGGING--");
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
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("WRITING TO", collection, "COLLECTION");
        console.debug("WRITE DATA:\n", data);
        console.debug("--END DEBUGGING--");
    }

    var collection_ref = db.collection(collection);

    var response = {
        success: false,
        id: null
    }

    await collection_ref
    .add(data)
    .then(function(doc_ref) {
        response.success = true;
        response.id = doc_ref.id;
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
        response.success = false;
    });

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
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("UPDATING", collection, "COLLECTION");
        console.debug("UPDATE DATA:\n", doc.data);
        console.debug("--END DEBUGGING--");
    }

    var collection_ref = db.collection(collection);
    var response = {
        success: false
    };

    await collection_ref.doc(doc.id)
    .update(doc.data)
    .then(function() {
        response.success = true;
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
        response.success = false;
    });

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
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("DELETING FROM", collection, "COLLECTION");
        console.debug("DELETE DOC:\n", doc.id);
        console.debug("--END DEBUGGING--");
    }

    var collection_ref = db.collection(collection);
    var response = {
        success: false,
        id: null
    };

    await collection_ref.doc(doc.id)
    .delete()
    .then(function() {
        response.success = true;
    })
    .catch(function(error) {
        console.error("Error deleting document: ", error);
        response.success = false;
    });

    return response
}