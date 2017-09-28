var express = require('express');
var router = express.Router();
var dbconfig = require('../util/db-config');
var firebase = require('firebase');
require('firebase/database');
// const firebaseApp = firebase.initializeApp(dbconfig);

const tableName = "/ersDispatches/";

/* GET calls listing. */
// get a test dispatch that already exists in the ersDispatches collection
router.get('/', function(req, res, next) {
  var call = "1";
  console.log('tableName: ', tableName);
  console.log('call: ', call);
  firebase.database().ref(tableName + call).once('value')
    .then(function(snapshot) {
      if (snapshot){
        console.log(snapshot.val());
        res.send(snapshot.val());
      } else {
        console.error('ERROR: failed to get a snapshot from Firebase');
      }
  });
});


/* POST calls listing. */
router.post('/', function(req, res, next) {

  console.log('req.query', req.query);
  let callQuery = JSON.stringify(req.query);

  var newCall = firebase.database().ref(tableName).push(req.query, error => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      var newKey = newCall.getKey();
      res.send(`Your POST: ${callQuery} and the new Key: ${newKey}`);
    }
  });
});

module.exports = router;
