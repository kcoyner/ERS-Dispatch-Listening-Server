/**
 * app.js
 *
 */

const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const morgan = require('morgan')
const path = require('path')
const requestIp = require('request-ip')

var index = require('./routes/index')
var users = require('./routes/users')
var calls = require('./routes/calls')
var api = require('./routes/api')
var callMaker = require('./util/callGenerator.js')

const NODE_ENV = process.env.NODE_ENV
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const configProd = require('./webpack.prod.js')
let config = require('./webpack.dev.js')
if (NODE_ENV === 'production') {
  config = configProd
}
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

/** morgan - log only 4xx and 5xx responses to console */
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// view engine setup
// TODO: only used for 404 right now.
// re-do your 404 error handling and display
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cors(corsOptions))
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
