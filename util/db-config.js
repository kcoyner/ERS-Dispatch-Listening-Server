/*
 * util/db-config.js
 *
 */

const request = require('request');
const schedule = require('node-schedule');

const admin = require('firebase-admin');
const serviceAccount = require('../key/ers-dispatch-firebase-adminsdk-08k8q-3c9e3d13f9');
const firebase_cred = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ers-dispatch.firebaseio.com',
};
admin.initializeApp(firebase_cred);
const db = admin.database();

/**
 * Generate a periodic GET request to ping Firebase to keep it alert
 * @param {number} pinger.second
 * @param {string} tableName
 * @param {string} getCall
 * @param {string} options.url
 */
const startDatabasePinger = () => {
  console.log('Starting database pinger ...');
  var pinger = new schedule.RecurrenceRule();
  pinger.minute = 12;
  pinger.second = 40;

  schedule.scheduleJob(pinger, function () {
    const tableName = '/ersDispatches/';

    var options = {
      method: 'GET',
      // url: 'http://localhost:30137/calls',
      url: 'https://gfd.dispatch.rustybear.com/calls',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        throw new Error(error);
      } else if (body === '') {
        console.log('ERROR: an empty body was returned');
      } else {
        // uncomment for debugging only, otherwise it just clogs the logs
        // which you can find at /var/log/nodejs/nodejs.log
        // console.log(body);
      }
    });
  });
};

startDatabasePinger();

module.exports = db;

