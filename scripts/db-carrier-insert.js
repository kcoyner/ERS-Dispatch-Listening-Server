/**
 * scripts/db-carrier-insert.js
 *
 */

const dynamo = require('dynamodb')
const AWS = dynamo.AWS
const dotenv = require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})

const Carrier = require('../models/carrier/carrier')

var carrier = {
  "google":"@msg.fi.google.com",
  "verizon":"@vtext.com"
}

for(var key in carrier) {
  if (carrier.hasOwnProperty(key)) {
    Carrier.create({
      carrierName: key,
      gateway: carrier[key]
    },
    function (err, carrier) {
      if (err) {
        console.error("Error on data insert into Carrier table", err)
      } else {
        console.log("Successfully added ", carrier.get('carrierName'))
      }
    })
  }
}
