var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var firebase = require('firebase');
require('firebase/database');
var dbconfig = require('./util/db-config');
var schedule = require('node-schedule');
var data = require('./util/dummy_data');

var index = require('./routes/index');
var users = require('./routes/users');
var calls = require('./routes/calls');

firebase.auth().signInWithEmailAndPassword('emergency.response.solutions1@gmail.com', 'password')
.catch(function(error) {
  console.log(error);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/calls', calls)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// generate dummy calls on a schedule
function startDummyCalls() {

  var rule = new schedule.RecurrenceRule();
  rule.minute = 40;

  schedule.scheduleJob(rule, function () {
    const tableName = "/ersDispatches/";
    var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1);
    var dummyCall = data.maindata[randomCallNumber];

    var options = {
      method: 'POST',
      // url: 'http://localhost:30137/calls',
      url: 'http://gfd.dispatch.rustybear.com/calls',
      qs: dummyCall,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      console.log('stop the dummies');
      console.log(body);
    });
  });
}

startDummyCalls();

module.exports = app;
