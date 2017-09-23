var express = require('express');
var router = express.Router();

/* GET calls listing. */
router.get('/', function(req, res, next) {
  res.send('You done did a GET.  Cool.  The next version should give you something more interesting.');
});

/* POST calls listing. */
router.post('/', function(req, res, next) {
  console.log('req.query', req.query);
  let myQuery = JSON.stringify(req.query);
  res.send(`You POSTed: ${myQuery}`);
});

module.exports = router;
