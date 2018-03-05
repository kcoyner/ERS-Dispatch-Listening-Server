/**
 * models/user/user.js
 *
 * Enter phone number as 5553451212
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '2035551212'
    },
    carrier: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    tracking: {
      type: Sequelize.STRING,
      // type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
      // defaultValue: ['E1, E2']
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  })
}

// const dynamo = require('dynamodb')
// const Joi = require('joi')
// const User = dynamo.define('User', {
//   hashKey: 'mobile',
//   // add the timestamp attributes (updatedAt, createdAt)
//   timestamps: true,
//   schema: {
//     user_id: dynamo.types.uuid(),
//     firstName: Joi.string().optional().allow(''),
//     lastName: Joi.string().optional().allow(''),
//     mobile: Joi.string().replace(/-/g, '').replace(/\./g, '').replace(/\(/g, '').replace(/\)/, ''),
//     carrier: Joi.string().optional().allow(''),
//     tracking: Joi.array().items(Joi.string()).allow(''),
//     enabled: Joi.boolean().default(true)
//   }
// })
// module.exports = User

