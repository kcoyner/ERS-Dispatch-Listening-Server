'use strict';

const request = require("request");
const dbconfig = require('./db-config');
const firebase = require('firebase');
const schedule = require('node-schedule');
const data = require('./dummy_data');

require('firebase/database');

/**
 * Generate dummy calls every hour on the minute
 * @param {number} rule.minute
 */
const startDummyCalls = () => {
  var rule = new schedule.RecurrenceRule();
  rule.minute = 17;

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

module.exports = startDummyCalls;
