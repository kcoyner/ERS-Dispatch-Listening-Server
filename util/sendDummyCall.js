'use strict';

/**
 * util/sendDummyCall.js
 * Sends a dummy call
 *
 */

const data = require('./dummy_data');
const request = require('request');

var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1);
var dummyCall = data.maindata[randomCallNumber];

const sendDummyCall = () => {
  var options = {
    method: 'POST',
    // url: 'http://localhost:1337/calls',
    url: 'http://gfd.dispatch.rustybear.com/calls',
    qs: dummyCall,
    headers: {
      'content-type': 'application/json'
    }
  };
  request(options, function(error, response, body) {
    if (error) {
      throw new Error(error);
    } else {
      console.log(body);
    }
  });
};

sendDummyCall();

