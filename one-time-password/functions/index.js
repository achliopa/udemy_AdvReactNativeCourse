const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');
const serviceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-3751e.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);