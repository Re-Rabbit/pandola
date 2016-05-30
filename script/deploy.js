var gulp = require('gulp')
var ghpages = require('gulp-gh-pages')

function deploy() {
    return gulp.src(PATH_PROD + '/**/*')
	.pipe(ghpages({
	    //push: true
	    origin: 'origin',
	    branch: 'gh-pages'
	}))
}

function main() {
    gulp.task('default', gulp.series(deploy))
}

var PATH_SRC  = 'src'
var PATH_TMP  = 'tmp'
var PATH_PROD = 'dist'


main()
