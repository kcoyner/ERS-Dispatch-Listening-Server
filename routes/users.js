/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const User = require('../models/user')

// GET users listing
router.get('/', function (req, res, next) {
  if (req.query.mobile) {
    var user = req.query.mobile
    User.get(user, function (err, data) {
      if (err) {
        console.error('DYNAMO USER FETCH ERROR: ', err)
      } else {
        res.send(JSON.stringify(data))
      }
    })
  } else {
    res.send('TODO: respond with a list of users')
  }
})

module.exports = router
