var express = require('express');
var router = express.Router();
var dbconfig = require('../util/db-config');
var firebase = require('firebase');
require('firebase/database');
const firebaseApp = firebase.initializeApp(dbconfig);

const tableName = "/ersDispatches/";

/* GET calls listing. */
// get a test dispatch that already exists in the ersDispatches collection
router.get('/', function(req, res, next) {
  var call = "KuuPfk1MgaO04MLKkId";
  console.log('tableName: ', tableName);
  console.log('call: ', call);
  firebaseApp.database().ref(tableName + call).once('value').then(function(snapshot) {
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

  var newCall= firebaseApp.database().ref(tableName).push(req.query);
  var newKey = newCall.getKey();

  res.send(`You POSTed: ${callQuery}  ${newKey}`);
});

module.exports = router;
