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
  'Call': {readCapacity: 5, writeCapacity: 5}
}, function (err) {
  if (err) {
    console.log('Error creating tables: ', err)
  } else {
    console.log('Tables has been created')
  }
})

module.exports = Call
