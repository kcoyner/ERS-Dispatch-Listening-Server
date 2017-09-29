var request = require("request");
var dbconfig = require('./db-config');
var firebase = require('firebase');
require('firebase/database');

const tableName = "/ersDispatches/";
var data = require('./dummy_data');

var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1);

var dummyCall = data.maindata[randomCallNumber];

var options = {
  method: 'POST',
  // url: 'http://localhost:30303/calls',
  url: 'http://gfd.dispatch.rustybear.com/calls',
  qs: dummyCall,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
