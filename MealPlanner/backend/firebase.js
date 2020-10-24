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
if(!firebase.app.length) 
    firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/**
 * Queries the users collection with the given array of query parameters
 * 
 * @params {array[array]}   queries     An array of query parameters
 * 
 * @return {array[Objects]} Returns an array of each matchin document data 
 */
export async function query_users(queries){

    // Filter document reference for each query parameter
    var users_ref = db.collection("users")
    queries.forEach(query => {
        users_ref = users_ref.where(query[0], query[1], query[2]);
    });

    var users_query = []

    // Retrieve filtered data
    await users_ref.get()
    .then(function(query_snapshot) {
        query_snapshot.forEach(function(doc) {
            users_query.push(doc.data())
        })
    })
    .catch(function(error) {
        console.error("Error retrieving document: ", error);
    });

    return users_query;
}