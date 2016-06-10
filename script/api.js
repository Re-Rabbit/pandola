var fs  = require('fs')
var api = require('express').Router()

require('./api/page')(api)
require('./api/icon')(api)
require('./api/auth')(api)


module.exports = api
