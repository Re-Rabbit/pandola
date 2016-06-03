var fs  = require('fs')
var api = require('express').Router()

require('./api/page')(api)
require('./api/icon')(api)


module.exports = api
