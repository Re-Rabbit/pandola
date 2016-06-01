var sass = require('gulp-sass')

function cc(stream) {
    return stream.pipe(sass().on('error', sass.logError))
}


//@TODO remove compressed output use cssclean tool.
function min(stream) {
    return stream.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
}

module.exports = {
    cc: cc,
    min: min
}
