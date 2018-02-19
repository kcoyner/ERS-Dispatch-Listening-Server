/**
 *  models/station/index.js
 */

var dynamo = require('dynamodb')
var AWS = dynamo.AWS
const dotenv = require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})

var Station = require('./station')

dynamo.createTables({
  'Station': {readCapacity: 5, writeCapacity: 5}
}, function (err) {
  if (err) {
    console.log('Error creating Station table: ', err)
  } else {
    console.log('Station table has been created or already exists')
  }
})

module.exports = Station
