/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Apparatus = require('../models/apparatus')
const Station = require('../models/station')

// GET all users listing
router.get('/', function (req, res, next) {
    var user = req.query.mobile
    User.scan().exec( (err, data) => {
      if (err) {
        console.error('DYNAMO USER FETCH ERROR: ', err)
      } else {
        // res.send(JSON.stringify(data))
        res.send(data)
      }
    })
})

module.exports = router
