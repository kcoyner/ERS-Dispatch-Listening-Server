/**
 *  models/call/index.js
 */

// For use with postgresql
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv').config()
// Retrieve environment variables
const NODE_ENV = process.env.NODE_ENV
const DB_PG_PASSWD = process.env.DB_PG_PASSWD
// Initialize database settings
var db = {}
const DBNAME = 'gfddispatch'
const DBUSER = 'webapplogin'
// DB settings set with environment variables
var dbHost = 'dispatchresponse.cyqnwvgizc2j.us-east-1.rds.amazonaws.com'
var isDbConnSSL = false // for AWS use true, for localhost use false
if (NODE_ENV === 'production') {
  isDbConnSSL = true
}

const sequelize = new Sequelize(DBNAME, DBUSER, DB_PG_PASSWD, {
  host: dbHost,
  dialect: 'postgres',
  dialectOptions: { ssl: isDbConnSSL },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  define: {
    charset: 'utf8',
    timestamps: true
  }
})

fs.readdirSync(path.join(__dirname, '/'))
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname + '/', file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
// db.users.hasMany(db.scores, {foreignKey: 'user_id'});
// db.scores.belongsTo(db.users, {foreignKey: 'user_id'});

module.exports = db
