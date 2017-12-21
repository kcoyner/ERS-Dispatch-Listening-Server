/*
 * routes/calls.js
 */

const express = require('express');
const router = express.Router();
const db = require('../util/db-config');
const tableName = '/ersDispatches/';

const DEBUG = false; // set this to true to suppress sending POST requests to Firebase

/* GET calls listing. */
router.get('/', function(req, res, next) {
  var calls = db.ref(tableName).once('value')
    .then(function(snapshot) {
      snapshot = Object.keys(snapshot.val()).map(function(k) { return snapshot.val()[k]; });
      if (snapshot) {
        res.send(snapshot);
      } else {
        console.error('ERROR: failed to get a snapshot from Firebase');
      }
    });
});


/* POST calls listing. */
router.post('/', function(req, res) {

  let callQuery = req.body;

  if (DEBUG === true) {
    res.send(`DEBUG:  Your POST of ${callQuery} was successful but was not sent to Firebase`);
  } else {

    var newCall = db.ref(tableName).push(JSON.parse(callQuery), error => {
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

