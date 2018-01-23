const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');



exports.createUser = functions.https.onRequest(createUser);