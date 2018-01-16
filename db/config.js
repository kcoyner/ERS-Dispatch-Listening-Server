/**
 *  db/config.js
 */

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();
const calls = require('./models/calls');

const DBPASSWD = process.env.DBPASSWD_TESTING;
const HOST = 'stn4.homelinux.com'
const IS_CONN_SSL = false // for AWS use true, for localhost use false

const sequelize = new Sequelize('gfddispatch', 'webAppLogin', DBPASSWD, {
  host: HOST,
  dialect: 'postgres',
  dialectOptions: { ssl: IS_CONN_SSL },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  define: {
    charset: 'utf8',
    timestamps: false
  }
});

var db = {};

fs.readdirSync(__dirname + '/models')
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname + '/models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.users.hasMany(db.scores, {foreignKey: 'user_id'});
// db.scores.belongsTo(db.users, {foreignKey: 'user_id'});


module.exports = db;

