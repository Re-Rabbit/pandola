var gutil       = require('gulp-util')
var express     = require('express')
var morgan      = require('morgan')
var compression = require('compression')
var cors        = require('cors')
var paths       = require('./paths.js')


// @Todo remove static files

var apiNamespace = 'api'
var apiVersion   = '1'

function apiPathPrefix() {
    //return '/' + apiNamespace + '/v' + apiVersion
    return '/' + apiNamespace
}

function server() {
    var port = 7777
    var url  = 'http://localhost:' + port
    express()
        .use(cors())
	.use(compression())
	.use(morgan('dev'))
	.use('/', express.static(paths.tmp, { extensions: ['html'] }))
        .use(apiPathPrefix(), require('./api.js'))
	.listen(port)

    gutil.log('server started on ' + url)
}

module.exports = server
