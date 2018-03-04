/**
 * models/apparatus/apparatus.js
 *
 */
'use strict'

const dynamo = require('dynamodb')
const Joi = require('joi')

const Apparatus = dynamo.define('Apparatus', {
  hashKey: 'apparatusId',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  schema: {
    apparatusId: Joi.string().optional().allow(''),
    apparatusName: Joi.string().optional().allow(''),
    trackedBy: Joi.array().items(Joi.string()).allow(''),
    enabled: Joi.boolean().default(true)
  },
  tableName: 'apparatus'
})

module.exports = Apparatus
