var express = require('express');
var request = require('request');
var firebase = require('firebase');
require('firebase/database');
const schedule = require('node-schedule');

var firebase_cred = {
    apiKey: "AIzaSyAyscBTLhOFfz3rWvxCcg9Woyj5zJAKy9U",
    authDomain: "ers-dispatch.firebaseapp.com",
    databaseURL: "https://ers-dispatch.firebaseio.com",
    projectId: "ers-dispatch",
    storageBucket: "ers-dispatch.appspot.com",
    messagingSenderId: "412226656783"
}

firebase.initializeApp(firebase_cred);

firebase.auth().signInWithEmailAndPassword('emergency.response.solutions1@gmail.com', 'password')
.then(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('Logged in as: ', user.email);
  });
})
.catch(function(error) {
  console.log(error);
});

/**
 * Generate a periodic GET request to ping Firebase to keep it alert
 * @param {number} pinger.second
 * @param {string} tableName
 * @param {string} getCall
 * @param {string} options.url
 */
const startDatabasePinger = () => {
  console.log('Starting database pinger ...');
  var pinger = new schedule.RecurrenceRule();
  pinger.second = 40;

  schedule.scheduleJob(pinger, function () {
    const tableName = "/ersDispatches/";
    // var getCall = "1";  // make sure there is a call with ID 1 in the database

    var options = {
      method: 'GET',
      // url: 'http://localhost:30137/calls',
      url: 'http://gfd.dispatch.rustybear.com/calls',
      // qs: getCall,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    request(options, function(error, response, body) {
      if (error) {
        sendNotificationEmail(email, error);
        throw new Error(error);
      } else {
        // uncomment for debugging only, otherwise it just clogs the logs
        // which you can find at /var/log/nodejs/nodejs.log
        // console.log(body);
      }
    });
  });
}

startDatabasePinger();

module.exports = firebase_cred;

