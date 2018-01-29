/**
 * routes/calls.js
 */

const express = require('express')
const router = express.Router()
const db = require('../util/db-config') // firebase
const Call = require('../models/call')
const cuid = require('cuid')
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
//      models.calls.all().then(function (callList) {
        // console.log('IP:: ', req.clientIp);
        // console.log('Call List:: ', callList);
//      })
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

const sendToDynamo = (res, data) => {
  let slug = cuid.slug()
  let assignment = data.UnitList.split(',').splice(1).join(' ')
  let radioFreq = data.UnitList.split(',')[0]
  let crossStreet = data.x_street_name.split(' ').splice(3).join(' ')
  let mapRef = data.x_street_name.split(' ').splice(0, 3).join(' ')
  let cfsNo = Number.parseInt(data.cfs_no)
  let callDetails = {
    assignment: assignment,
    radio_freq: radioFreq,
    apt_no: data.apt_no,
    call_category: data.call_category,
    call_description: data.call_description,
    call_type: data.call_type,
    cfs_no: cfsNo,
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
    zip: data.zip,
    slug: slug
  }
  var newCall = new Call(callDetails)
  newCall.save(function (err) {
    if (err) {
      console.log('err: ', err)
    } else {
      console.log('created new item in DynamoDB calls: ', newCall.get('call_id'))
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
    sendToDynamo(res, callQuery)
    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful but was not sent to Firebase`)
  } else {
    sendToDynamo(res, callQuery)
  }
})

module.exports = router
