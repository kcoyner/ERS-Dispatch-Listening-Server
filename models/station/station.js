/**
 * models/station/station.js
 *
 */
'use strict'

const dynamo = require('dynamodb')
const Joi = require('joi')

const Apparatus = dynamo.define('Station', {
  hashKey: 'stationId',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  schema: {
    stationId: Joi.string().optional().allow(''),
    stationName: Joi.string().optional().allow(''),
  }
})

module.exports = Station
