var data     = require('gulp-data')
var htmlmin  = require('gulp-htmlmin')
var rev      = require('gulp-rev')
var nunjucks = require('gulp-nunjucks');


function cc(stream) {
    return stream
	.pipe(nunjucks.compile().on('error', console.log))
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
