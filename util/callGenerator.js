'use strict';

const request = require("request");
const nodemailer = require('nodemailer');
const dbconfig = require('./db-config');
const firebase = require('firebase');
const schedule = require('node-schedule');
const data = require('./dummy_data');

require('firebase/database');

/**
 * Generate dummy calls every hour on the minute
 * @param {number} rule.minute
 */

let mailTransport = nodemailer.createTransport('smtps://emergency.response.solutions1@gmail.com:P@$$w0rd1@smtp.gmail.com');
let email = 'kevin@rustybear.com';

// function sendNotificationEmail(email) {
const sendNotificationEmail = (email, text) => {
  let mailOptions = {
    from: '"ERS Errors" <noreply@rustybear.com>',
    to: email,
    subject: 'ERROR in ERS code',
    text: text
  };
  return mailTransport.sendMail(mailOptions).then(function() {
    console.log('An email has been sent to: ' + email);
  });
}

const startDummyCalls = () => {
  var rule = new schedule.RecurrenceRule();
  rule.minute = 28;

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
      if (error) {
        sendNotificationEmail(email, error);
        throw new Error(error);
      } else {
        console.log(body);
      }
    });
  });
}

module.exports = startDummyCalls;

