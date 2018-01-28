/**
 * routes/api.js
 * @namespace
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../util/db-config')  // firebase
const Call = require('../models/call')   // dynamo
const tableName = '/gfdDispatches/'

router.get('/', (req, res) => {
/**
 * API to get individual call details
 * @param {string} req request - this should be a call ID
 * @param {string} res
 * @returns {string} snapshot call details
 */

  if (req.query.slug) {
    // for use with dynamo
    var slug = req.query.slug
    Call.get(slug, function (err, data) {
      if (err) {
        console.error('DYNAMO FETCH ERROR: ', err)
      } else {
        // console.log(JSON.stringify(data))
        res.send(JSON.stringify(data))
      }
    })
  } else if (req.query.code) {
    // for use with firebase
    var code = req.query.code
    db.ref(`${tableName}${code}`).once('value')
      .then(function (snapshot) {
        if (snapshot) {
          // console.log(snapshot.val())
          res.send(JSON.stringify(snapshot.val()))
        }
      })
      .catch(function (err) {
        res.send(err)
      })
  } else {
    res.send('Please include key')
  }
})

module.exports = router
