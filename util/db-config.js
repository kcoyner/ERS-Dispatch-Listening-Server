var express = require('express');
var request = require('request');
var firebase = require('firebase');
require('firebase/database');

var firebase_cred = {
    apiKey: "AIzaSyAyscBTLhOFfz3rWvxCcg9Woyj5zJAKy9U",
    authDomain: "ers-dispatch.firebaseapp.com",
    databaseURL: "https://ers-dispatch.firebaseio.com",
    projectId: "ers-dispatch",
    storageBucket: "ers-dispatch.appspot.com",
    messagingSenderId: "412226656783"
}

// firebase.initializeApp(firebase_cred);

// firebase.auth().signInWithEmailAndPassword('emergency.response.solutions1@gmail.com', 'password')
// .catch(function(error) {
//   console.log(error);
// });

module.exports = firebase_cred;
