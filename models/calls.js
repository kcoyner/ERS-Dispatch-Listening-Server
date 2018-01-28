/**
 * models/calls.js
 *
 */
'use strict'

const dynamo = require('dynamodb')
const Joi = require('joi')

const Call = dynamo.define('Call', {
  hashKey: 'slug',
  // rangeKey: 'timeout',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  schema: {
    call_id: dynamo.types.uuid(),
    cfs_no: Joi.number(),
    assignment: Joi.string().optional().allow(''),
    radio_freq: Joi.string().optional().allow(''),
    apt_no: Joi.string().optional().allow(''),
    call_category: Joi.string().optional().allow(''),
    call_description: Joi.string().optional().allow(''),
    call_type: Joi.string().optional().allow(''),
    cfs_remark: Joi.string().optional().allow(''),
    city: Joi.string().optional().allow(''),
    dispatch_fire: Joi.string().optional().allow(''),
    latitude: Joi.string().optional().allow(''),
    location: Joi.string().optional().allow(''),
    longitude: Joi.string().optional().allow(''),
    premise_name: Joi.string().optional().allow(''),
    priority_amb: Joi.string().optional().allow(''),
    priority_fire: Joi.string().optional().allow(''),
    priority_pol: Joi.string().optional().allow(''),
    timeout: Joi.string(),
    cross_street: Joi.string().optional().allow(''),
    map_ref: Joi.string().optional().allow(''),
    test_call: Joi.boolean().default(false),
    zip: Joi.string().optional().allow(''),
    slug: Joi.string().optional().allow('')
  }
})

module.exports = Call
