/**
 * routes/api.js
 * @namespace
 *
 */

const express = require('express')
const router = express.Router()
const Call = require('../models/call')   // dynamo

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
        console.error('DYNAMO CALL FETCH ERROR: ', err)
      } else {
        // console.log(JSON.stringify(data))
        res.send(JSON.stringify(data))
      }
    })
  } else {
    res.send('Please include a reference to slug')
  }
})

module.exports = router
