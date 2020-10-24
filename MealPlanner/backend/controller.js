import * as fb from './firebase'
import base64 from 'base-64'

/**
 * Checks if the provided login information is valid
 * 
 * @param {string} username 
 * @param {string} password
 * 
 * @returns Returns true if the login information is valid
 */
export async function user_login(username, password) {

    var encoded_username = base64.encode(username);
    var encoded_password = base64.encode(password);

    var login = {success: false, err: ''}

    await fb.query_users([["username", "==", encoded_username],["password", "==", encoded_password]])
    .then(function(result) {
        if(result.length == 1) {
            login.success = true;
        } else if (result.length != 0) {
            console.error("Error duplicate users: ", result);
        } else {
            login.err = 'Invalid Username or Password';
        }
    })
    .catch(function(error) {
        console.error("Error querying user: ", error);
        login.err = 'Internal Error: Unable to query users.';
    })

    return login
}