// @Todo complete prod part.

var rev     = require('gulp-rev')
var data    = require('gulp-data')
var named   = require('vinyl-named')
var webpack = require('webpack-stream')
var path    = require('path')


function webpackConfig() {
    return {
	module: {
	    loaders: [{
		test: /\.jsx?$/,
		loader: 'babel',
		query: { compact: false }
	    },{
                test: /\.njk$/,
		loader: 'nunjucks'
	    }]
	},
	resolve: {
	    root: [
		path.resolve('./src/pages/templates'),
                path.resolve('./src/scripts/'),
		path.resolve('./')
	    ]
	}
    }
}


function cc(stream) {
    return stream
	.pipe(named())
	.pipe(webpack(webpackConfig()).on('error', console.log))
}


function min(stream) {
    return stream
}

module.exports = {
    cc: cc,
    min: min
}
