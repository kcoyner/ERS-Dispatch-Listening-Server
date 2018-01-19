/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()

// GET users listing
router.get('/', function (req, res, next) {
  res.send('respond with a list of users')
})

module.exports = router
