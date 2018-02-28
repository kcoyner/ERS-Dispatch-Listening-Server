/**
 * models/carrier/carrier.js
 *
 *
 */
'use strict'

const dynamo = require('dynamodb')
const Joi = require('joi')

const Carrier = dynamo.define('Carrier', {
  hashKey: 'carrierName',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  schema: {
    carrierId: dynamo.types.uuid(),
    carrierName: Joi.string().optional().allow(''),
    gateway: Joi.string().optional().allow(''),
    enabled: Joi.boolean().default(true)
  }
})

module.exports = Carrier
