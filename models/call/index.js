/**
 *  models/call/index.js
 */

var dynamo = require('dynamodb')
var AWS = dynamo.AWS
const dotenv = require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})
// AWS.config.loadFromPath('.aws-credentials.json')

var Call = require('./call')

dynamo.createTables({
  'Call': {readCapacity: 11, writeCapacity: 9}
}, function (err) {
  if (err) {
    console.log('Error creating Call table: ', err)
  } else {
    console.log('Call table has been created or already exists')
  }
})

module.exports = Call
