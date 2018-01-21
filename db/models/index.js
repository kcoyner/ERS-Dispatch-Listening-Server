/**
 *  db/models/index.js
 */

const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv').config()

// Retrieve environment variables
const NODE_ENV = process.env.NODE_ENV
const DBPASSWD_PRODUCTION = process.env.DBPASSWD_PRODUCTION
const DBPASSWD_TESTING = process.env.DBPASSWD_TESTING

// Initialize database settings
var db = {}
const DBNAME = 'gfddispatch'
const DBUSER = 'webapplogin'

// DB settings set with environment variables
var dbHost = ''
var dbPasswd = ''
var isDbConnSSL = false // for AWS use true, for localhost use false

dbHost = 'ersdispatch.cguymocs6upp.us-east-1.rds.amazonaws.com'
isDbConnSSL = true
dbPasswd = DBPASSWD_PRODUCTION

// if (NODE_ENV === 'testing') {
//   // dbHost = 'pca.homelinux.com'
//   dbHost = 'stn4.homelinux.com'
//   isDbConnSSL = false
//   dbPasswd = DBPASSWD_TESTING
// } else if (NODE_ENV === 'production') {
//   dbHost = 'ersdispatch.cguymocs6upp.us-east-1.rds.amazonaws.com'
//   isDbConnSSL = true
//   dbPasswd = DBPASSWD_PRODUCTION
// } else {
//   console.error('ERROR: Could not connect to DB. Set NODE_ENV to either \'production\' or \'testing\'.')
// }

const sequelize = new Sequelize(DBNAME, DBUSER, dbPasswd, {
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
    timestamps: false
  }
})

// fs.readdirSync(__dirname + '/models')
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
