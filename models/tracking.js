/**
 * models/tracking.js
 *
 */
'use strict'

const Sequelize = require('sequelize')
const Users = require('./user')
const Apparatus = require('./apparatus')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tracking', {
    trackingId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: Users,
        key: Users.userId,
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    apparatusId: {
      type: Sequelize.INTEGER,
      references: {
        model: Apparatus,
        key: Apparatus.userId,
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  })
}
