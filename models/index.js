/**
 *  models/index.js
 */
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv').config()
var dynamo = require('dynamodb')
var Joi = require('joi')
var AWS = dynamo.AWS

AWS.config.loadFromPath('.aws-credentials.json');
AWS.config.update({region: "us-east-1"});

const Call = dynamo.define('Call', {
  hashKey : 'cfs_no',
  rangeKey : 'timeout',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps : true,
  schema : {
    cfs_no   : Joi.number(),
    assignment   : Joi.string().optional().allow(''),
    radio_freq   : Joi.string().optional().allow(''),
    apt_no   : Joi.string().optional().allow(''),
    call_category   : Joi.string().optional().allow(''),
    call_description   : Joi.string().optional().allow(''),
    call_type   : Joi.string().optional().allow(''),
    cfs_remark   : Joi.string().optional().allow(''),
    city   : Joi.string().optional().allow(''),
    dispatch_fire   : Joi.string().optional().allow(''),
    latitude   : Joi.string(),
    location   : Joi.string().optional().allow(''),
    longitude   : Joi.string(),
    premise_name   : Joi.string().optional().allow(''),
    priority_amb   : Joi.string().optional().allow(''),
    priority_fire   : Joi.string().optional().allow(''),
    priority_pol   : Joi.string().optional().allow(''),
    timeout   : Joi.string(),
    cross_street   : Joi.string().optional().allow(''),
    map_ref   : Joi.string().optional().allow(''),
    test_call   : Joi.boolean().default(false),
    zip   : Joi.string().optional().allow('')
  }
});


dynamo.createTables({
  'Call': {readCapacity: 5, writeCapacity: 5}
}, function(err) {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables has been created');
  }
});


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

module.exports = Call
