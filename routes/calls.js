/**
 * routes/calls.js
 */

const express = require('express')
const router = express.Router()
const db = require('../util/db-config') // firebase
// const DB = require('../db/models')      // postgres
const models = require('../db/models')
const tableName = '/gfdDispatches/'

const DEBUG = false // set this to true to suppress sending POST requests to Firebase

// GET calls listing
router.get('/', function (req, res, next) {
  db.ref(tableName).once('value')
    .then(function (snapshot) {
      snapshot = Object.keys(snapshot.val()).map(function (k) {
        return snapshot.val()[k]
      })
      if (snapshot) {
        res.send(snapshot)
      } else {
        console.error('ERROR: failed to get a snapshot from Firebase')
      }
    })
    // TODO: uncomment this when postgresql is up and running
  // models.calls.all().then(function (callList) {
  //   console.log(callList)
  // })
})

const sendToFirebase = (res, tableName, data) => {
  let newCall = db.ref(tableName).push(data, error => {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    } else {
      var newKey = newCall.getKey()
      data = JSON.stringify(data)
      res.send(`Your POST: ${data} with the new Key: ${newKey} was successful`)
    }
  })
}

// POST calls listing
router.post('/', function (req, res) {
  let callQuery = null

  if (Object.values(req.query).length !== 0) {
    /* x-www-form-urlencoded, therefore use req.query */
    callQuery = req.query
  } else {
    /* raw, therefore use req.body and JSON.parse it */
    callQuery = JSON.parse(req.body)
  }

  if (DEBUG === true) {
    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful but was not sent to Firebase`)
  } else {
    sendToFirebase(res, tableName, callQuery)
  }
})

module.exports = router
