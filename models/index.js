/**
 *  models/index.js
 */

var dynamo = require('dynamodb')
var AWS = dynamo.AWS

AWS.config.loadFromPath('.aws-credentials.json')
AWS.config.update({region: 'us-east-1'})

var Call = require('./calls')

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
