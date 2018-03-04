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
var dbHost = 'ersdispatch.cguymocs6upp.us-east-1.rds.amazonaws.com'
var dbPasswd = ''
var isDbConnSSL = false // for AWS use true, for localhost use false
isDbConnSSL = true

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
    timestamps: false
  }
})

fs.readdirSync(path.join(__dirname, '/'))
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'call.js')
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

// module.exports = db
module.exports.db = db
// exports.db = db



/**
 * This is where Dynamo begins
 *
 */

// const NODE_ENV = process.env.NODE_ENV
// const dotenv = require('dotenv').config()
var dynamo = require('dynamodb')
var AWS = dynamo.AWS

const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})
// AWS.config.loadFromPath('.aws-credentials.json')

var Call = require('./call')

dynamo.createTables({
  'Call': {readCapacity: 11, writeCapacity: 9}
}, function (err) {
  if (err) {
    console.log('Error creating Call table: ', err)
  } else {
    console.log('Call table has been created or already exists')
  }
})

// module.exports = Call
module.exports.Call = Call
// exports.Call = Call
