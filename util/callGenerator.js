var dbconfig = require('./db-config');
var firebase = require('firebase');
require('firebase/database');
const firebaseApp = firebase.initializeApp(dbconfig);

const tableName = "/ersDispatches/";

var data = require('./dummy_data');
// console.log('data: ', data.maindata);

// data.maindata.forEach(call => console.log(call) );

// Get a random call object from data
var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1);

// Update the timestamp/timeout


// Update Firebase database
var newCall = firebaseApp.database().ref(tableName).push(data.maindata[randomCallNumber]);
console.log('newCall: ', newCall);
