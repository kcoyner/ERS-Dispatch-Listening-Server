/*
 * app.js
 */

var express = require('express')
var fs = require('fs')
var path = require('path')
var favicon = require('serve-favicon')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var requestIp = require('request-ip')
var rfs = require('rotating-file-stream')

var index = require('./routes/index')
var users = require('./routes/users')
var calls = require('./routes/calls')
var api = require('./routes/api')

var callMaker = require('./util/callGenerator.js')

var app = express()

/** morgan based logs
    log only 4xx and 5xx responses to console */
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
var logDirectory = path.join(__dirname, 'log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
app.use(morgan('combined', {stream: accessLogStream}))
/** end morgan logs **/

// view engine setup
// TODO: only used for 404 right now.
// re-do your 404 error handling and display
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cors())
app.use(requestIp.mw())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/*' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/calls', calls)
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// start creating dummy calls
// comment out once live data is received
// see ./util/callGenerator.js
callMaker.startDummyCalls()

module.exports = app
