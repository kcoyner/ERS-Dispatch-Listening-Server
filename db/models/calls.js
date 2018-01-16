/*
 * db/models/calls.js
 *
 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Calls', {
    call_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    assignment: {
      // UnitList - also contains radio channel as first item
      // CH1A, E5, E2
      type: Sequelize.STRING,
      allowNull: false
    },
    apt_no: {
      // apt_no
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    call_category: {
      // call_category
      // STILL ALARM
      type: Sequelize.STRING,
      allowNull: false
    },
    call_description: {
      // call_description
      // STILL ALARM
      type: Sequelize.STRING,
      allowNull: false
    },
    call_type: {
      // call_type
      // 801
      type: Sequelize.STRING,
      allowNull: false
    },
    cfs_no: {
      // cfs_no  -- not used in this app
      // 1800001672
      type: Sequelize.STRING,
      allowNull: false
    },
    cfs_remark: {
      // cfs_remark
      // WATER CONDITION IN THE HOME - BROKEN WATER PIPE
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      // city
      // Cos Cob
      type: Sequelize.STRING,
      allowNull: false
    },
    dispatch_fire: {
      // dispatch_fire -- not used in this app
      // 1900-01-01T00:00:00
      type: Sequelize.STRING,
      allowNull: false
    },
    latitude: {
      // latitude
      // 41.0401\r
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      // location
      // 00084  RIVER RD
      type: Sequelize.STRING,
      allowNull: false
    },
    longitude: {
      // longitude
      // -73.50401\r
      type: Sequelize.STRING,
      allowNull: false
    },
    premise_name: {
      // premise_name -- not always supplied from Dispatch
      // 84 RIVER RD
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
    },
    priority_amb: {
      // priority_amb
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    priority_fire: {
      // priority_fire
      // FD Pri:1
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    priority_pol: {
      // priority_pol
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    timeout: {
      // rec_dt
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    cross_street: {
      // x_street_name -- contains map reference and cross streets
      //  Map -M20 NEWMAN ST&RIVER LN
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    map_ref: {
      // x_street_name -- contains map reference and cross streets
      //  Map -M20 NEWMAN ST&RIVER LN
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    zip: {
      // zip
      //
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
      // validate: {
      //   min: 0,
      //   max: 10
      // }
    }
  })
}
