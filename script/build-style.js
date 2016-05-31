var sass = require('gulp-sass')

function cc(stream) {
    return stream.pipe(sass().on('error', sass.logError))
}

function min(stream) {
    return stream.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
}

module.exports = {
    cc: cc,
    min: min
}
