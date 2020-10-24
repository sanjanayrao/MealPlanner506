const firebase = require("firebase");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyDRCnGnTx85iTkSaI9aMI168sQ81NpcwmA",
    authDomain: "meal-planner-2692d.firebaseapp.com",
    databaseURL: "https://meal-planner-2692d.firebaseio.com",
    projectId: "meal-planner-2692d",
    storageBucket: "meal-planner-2692d.appspot.com",
    messagingSenderId: "327517910029",
    appId: "1:327517910029:web:a062770fb43ea4b428d144",
    measurementId: "G-X1STGXH62T"
};

// Initialize Firebase
if(!firebase.app.length) // Comment this out the first time you start expo
    firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const __DEBUG__ = false;

/**
 * Queries the users collection with the given array of query parameters
 * 
 * @param {array[array]}   queries     An array of query parameters
 * 
 * @return {array[Objects]} Returns an array of each matchin document data 
 */
export async function query_users(queries) {
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("QUERYING USERS COLLECTION");
        console.debug("QUERY PARAMETERS:\n", queries);
    }

    // Filter document reference for each query parameter
    var users_ref = db.collection("users");
    queries.forEach(query => {
        users_ref = users_ref.where(query[0], query[1], query[2]);
    });

    var users_query = [];

    // Retrieve filtered data
    await users_ref.get()
    .then(function(query_snapshot) {
        query_snapshot.forEach(function(doc) {
            users_query.push({"id": doc.id, "data": doc.data()})
        })
    })
    .catch(function(error) {
        console.error("Error retrieving document: ", error);
    });

    if(__DEBUG__) {
        console.debug("QUERY DATA:\n", users_query);
        console.debug("--END DEBUGGING--");
    }

    return users_query;
}

/**
 *  Sets data in the users collection with the provided data
 * 
 * @param {Object}  doc     A firebase document object
 * 
 * @returns Return true on success
 */
export async function write_users(doc) {
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("WRITING TO USERS COLLECTION");
        console.debug("WRITE DATA:\n", data);
        console.debug("--END DEBUGGING--");
    }

    var users_ref = db.collection("users");
    var err = false;

    await users_ref.doc(doc.id)
    .set(doc.data)
    .then(function(){})
    .catch(function(error) {
        console.error("Error updating document: ", error);
        err = true;
    });

    return !err;
}

/**
 *  Updates data in the users collection with the provided data
 * 
 * @param {Object}  doc     A firebase document object
 * 
 * @returns Return true on success
 */
export async function update_users(doc) {
    if(__DEBUG__) {
        console.debug("--BEGIN DEBUGGING--");
        console.debug("UPDATING USERS COLLECTION");
        console.debug("UPDATE DATA:\n", data);
        console.debug("--END DEBUGGING--");
    }

    var users_ref = db.collection("users");
    var err = false;

    await users_ref.doc(doc.id)
    .update(doc.data)
    .then(function(){})
    .catch(function(error) {
        console.error("Error updating document: ", error);
        err = true;
    });

    return !err;
}