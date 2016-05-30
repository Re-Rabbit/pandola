//var template = require('gulp-template')
var wrap    = require('gulp-wrap')
var data    = require('gulp-data')
var htmlmin = require('gulp-htmlmin')
var rev     = require('gulp-rev')

function cc(stream) {
    return stream
	.pipe(data(function(file) {
	    return { filename: file.path.match(/(\w+).html/)[1] }
	}))
	.pipe(wrap({ src: './src/pages/_layout' }, { variable: 'data' }))
}

function min(stream) {
    return stream
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(rev({ merge: true }))
}

module.exports = {
    cc: cc,
    min: min
}
