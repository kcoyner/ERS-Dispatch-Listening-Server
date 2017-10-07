var express = require('express');
var router = express.Router();
var dbconfig = require('../util/db-config');
var firebase = require('firebase');
require('firebase/database');

const DEBUG = false;  // set this to true to suppress sending POST requests to Firebase
const tableName = "/ersDispatches/";

/* GET calls listing. */
// get a test dispatch that already exists in the ersDispatches collection
router.get('/', function(req, res, next) {
  var calls = firebase.database().ref(tableName).once('value')
    .then(function(snapshot) {
      if (snapshot) {
        res.send(snapshot.val());
      } else {
        console.error('ERROR: failed to get a snapshot from Firebase');
      }
    });
});


/* POST calls listing. */
router.post('/', function(req, res, next) {
  let callQuery = JSON.stringify(req.query);
  if (DEBUG === true) {
    res.send(`DEBUG:  Your POST of ${callQuery} was successful but was not sent to Firebase`);
  } else {
    var newCall = firebase.database().ref(tableName).push(req.query, error => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        var newKey = newCall.getKey();
        res.send(`Your POST: ${callQuery} with the new Key: ${newKey} was successful`);
      }
    });
  }
});

module.exports = router;

