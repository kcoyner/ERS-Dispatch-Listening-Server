/**
 * models/station.js
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('stations', {
    stationId: {
      // STA2
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    stationName: {
      // Station 2 or Cos Cob
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  })
}

// const dynamo = require('dynamodb')
// const Joi = require('joi')
// const Station = dynamo.define('Station', {
//   hashKey: 'stationId',
//   // add the timestamp attributes (updatedAt, createdAt)
//   timestamps: true,
//   schema: {
//     stationId: Joi.string().optional().allow(''),
//     stationName: Joi.string().optional().allow(''),
//   }
// })
// module.exports = Station
