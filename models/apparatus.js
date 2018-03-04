/**
 * models/apparatus.js
 *
 */
'use strict'

// const Apparatus = dynamo.define('Apparatus', {
//   hashKey: 'apparatusId',
//   // add the timestamp attributes (updatedAt, createdAt)
//   timestamps: true,
//   schema: {
//     apparatusId: Joi.string().optional().allow(''),
//     apparatusName: Joi.string().optional().allow(''),
//     enabled: Joi.boolean().default(true)
//   },
//   tableName: 'apparatus'
// })
// module.exports = Apparatus

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('apparatus', {
    apparatusId: {
      // E5
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    apparatusName: {
      // Engine 5
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
