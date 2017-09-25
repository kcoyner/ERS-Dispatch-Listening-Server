var express = require('express');
var router = express.Router();
var dbconfig = require('../util/db-config');
var firebase = require('firebase');
require('firebase/database');
const firebaseApp = firebase.initializeApp(dbconfig);

/* GET calls listing. */
// get a test dispatch that already exists in the test_dispatch collection
router.get('/', function(req, res, next) {
  var call = 1700034281;
  firebaseApp.database().ref('/test_dispatches/' + call).once('value').then(function(snapshot) {
    console.log(snapshot.val());
    res.send(snapshot.val());
  });
});


/* POST calls listing. */
router.post('/', function(req, res, next) {

  console.log('req.query', req.query);
  let myQuery = JSON.stringify(req.query);
  // let myQuery = JSON.parse(req.query);

  var newCallKey = firebaseApp.database().ref().child('/test_dispatches/').push().key;
  req.query['callId'] = newCallKey;
  var updateCalls = {};
  updateCalls['/test_dispatches/'] = req.query;
  firebaseApp.database().ref().update(updateCalls);

  res.send(`You POSTed: ${myQuery}`);


});

module.exports = router;
