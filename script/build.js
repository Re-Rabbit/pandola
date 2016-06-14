var gulp = require('gulp')
var build = require('./libbuild')

function main() {
    gulp.task('default', gulp.series(build.clean, build.buildAll))
}

main()