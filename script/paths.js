/**
 * Paths.
 */
var PATH_SRC  = 'src'
var PATH_TMP  = 'tmp'
var PATH_DIST = 'dist'
var PATH_PUBLISH = '.publish'

exports.src = PATH_SRC
exports.tmp  = PATH_TMP
exports.dist = PATH_DIST
exports.publish = PATH_PUBLISH

exports.dirs = {
    html: PATH_SRC + '/pages/*.html',
    style: PATH_SRC + '/styles/pages/*.scss',
    styleSources: PATH_SRC + '/styles/**/*.scss',
    script: PATH_SRC + '/scripts/pages/*.js',
}
