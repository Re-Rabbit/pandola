var gutil = require('gulp-util')
var express = require('express')
var morgan = require('morgan')
var compression = require('compression')
var open = require('open')


function server(dir) {
    return function() {
	var port = 8888
	var url  = 'http://localhost:' + port
	
	express()
	    .use(compression())
	    .use(morgan('dev'))
	    .use('/', express.static(dir, { extensions: ['html'] }))
	    .listen(port)

	gutil.log('server started on ' + url)
	
	open(url)
    }
}

module.exports = server
