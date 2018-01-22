/**
 * routes/calls.js
 */

const express = require('express')
const router = express.Router()
const db = require('../util/db-config') // firebase
const models = require('../models')
const tableName = '/gfdDispatches/'

const DEBUG = false // set this to true to suppress sending POST requests to Firebase

// GET calls listing
router.get('/', function (req, res, next) {
  db.ref(tableName).once('value')
    .then(function (snapshot) {
      // this is firebase
      snapshot = Object.keys(snapshot.val()).map(function (k) {
        return snapshot.val()[k]
      })
      if (snapshot) {
        res.send(snapshot)
      } else {
        console.error('ERROR: failed to get a snapshot from Firebase')
      }
    })
    .then(function () {
        // TODO: this is postgresql
      models.calls.all().then(function (callList) {
        // console.log('IP:: ', req.clientIp);
        // console.log('Call List:: ', callList);
      })
    })
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

const sendToPostgres = (res, data) => {
  let assignment = data.UnitList.split(',').splice(1).join(' ')
  let radioFreq = data.UnitList.split(',')[0]
  let crossStreet = data.x_street_name.split(' ').splice(3).join(' ')
  let mapRef = data.x_street_name.split(' ').splice(0, 3).join(' ')
  let callDetails = {
    assignment: assignment,
    radio_freq: radioFreq,
    apt_no: data.apt_no,
    call_category: data.call_category,
    call_description: data.call_description,
    call_type: data.call_type,
    cfs_no: data.cfs_no,
    cfs_remark: data.cfs_remark,
    city: data.city,
    dispatch_fire: data.dispatch_fire,
    latitude: data.latitude,
    location: data.location,
    longitude: data.longitude,
    premise_name: data.premise_name,
    priority_amb: data.priority_amb,
    priority_fire: data.priority_fire,
    priority_pol: data.priority_pol,
    timeout: data.rec_dt,
    cross_street: crossStreet,
    map_ref: mapRef,
    test_call: data.test_call,
    zip: data.zip
  }
  models.calls.create(callDetails)
  .then(callDetails => {
    console.log('CALL DETAILS:  ', callDetails)
  })
  .catch(error => {
    // TODO: not sure this is working or correct. creates unhandled promise error
    // To test, misspell callDetails above
    throw error
  })
}

// POST calls listing
router.post('/', async function (req, res) {
  let callQuery = null

  if (Object.values(req.query).length !== 0) {
    /* x-www-form-urlencoded, therefore use req.query */
    callQuery = req.query
  } else {
    /* raw, therefore use req.body and JSON.parse it */
    callQuery = JSON.parse(req.body)
  }

  if (DEBUG === true) {
    await sendToPostgres(res, callQuery)
    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful but was not sent to Firebase`)
  } else {
    await sendToPostgres(res, callQuery)
    sendToFirebase(res, tableName, callQuery)
  }
})

module.exports = router
