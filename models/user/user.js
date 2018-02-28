/**
 * models/user/user.js
 *
 * Enter phone number as 5553451212
 *
 */
'use strict'

const dynamo = require('dynamodb')
const Joi = require('joi')

const User = dynamo.define('User', {
  hashKey: 'mobile',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  schema: {
    user_id: dynamo.types.uuid(),
    firstName: Joi.string().optional().allow(''),
    lastName: Joi.string().optional().allow(''),
    mobile: Joi.string().replace(/-/g, '').replace(/\./g, '').replace(/\(/g, '').replace(/\)/, ''),
    carrier: Joi.string().optional().allow(''),
    tracking: Joi.array().items(Joi.string()).allow(''),
    enabled: Joi.boolean().default(true)
  }
})

module.exports = User
