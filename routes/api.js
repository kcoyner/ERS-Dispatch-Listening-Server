/** @namespace */

const express = require('express');
const router = express.Router();
const db = require('../util/db-config');
const tableName = '/ersDispatches/';

router.get('/', (req, res) => {
/**
 * API to get individual call details
 * @param {string} req request - this should be a call ID
 * @param {string} res
 * @returns {string} snapshot call details
 */
  if (req.query.code) {
    var code = req.query.code;
    db.ref(`${tableName}${code}`).once('value')
      .then(function(snapshot) {
        if (snapshot) {
          console.log(snapshot.val());
          res.send(JSON.stringify(snapshot.val()));
        }
      })
      .catch(function(err) {
        res.send(err);
      });
  } else {
    res.send('Please include key');
  }
});

module.exports = router;
