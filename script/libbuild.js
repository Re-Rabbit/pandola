
var gulp = require('gulp')
var sass = require('gulp-sass')
var nunjucks = require('gulp-nunjucks')
var nunjucks_impl = require('nunjucks')
var named = require('vinyl-named')
var path = require('path')
var webpack = require('webpack-stream')
var del = require('del')
var reload = require('browser-sync').reload
var cached = require('gulp-cached')
var remember = require('gulp-remember')
var webpackConfig = require('./../webpack.config.js')



const src = './pages'
const components = './components'

const paths = {
    src: src,
    tmp: './tmp',
    publish: './.publish',
    dirs: {
        html: src + '/**/index.html',
        style: src + '/**/index.scss',
        script: src + '/**/index.js',
        image: src + '/**/images/*',
        api: src + '/**/api.js',
        font: './node_modules/ionicons/dist/fonts/**/*.*'
    },
    watchers: {
	      style: [
	          src + '/**/*.scss',
	          components + '/**/*.scss'
	      ],
        html: src + '/**/*.html'
    }
}


function clean() {
    return del(paths.tmp + '/*')
}

function buildHtml() {
    var nunjucks_env = new nunjucks_impl.Environment(new nunjucks_impl.FileSystemLoader(src + '/..'));
    return gulp
        .src(paths.dirs.html, { base: src })
        .pipe(nunjucks.compile({}, { env: nunjucks_env }).on('error', console.log))
        .pipe(gulp.dest(paths.tmp))
}

function buildStyle() {
    return gulp
        .src(paths.dirs.style)
	  //.pipe(cached('styles'))
        .pipe(sass().on('error', sass.logError))
	  //.pipe(remember('styles'))
        .pipe(gulp.dest(paths.tmp))
	      .pipe(reload({ stream: true }))
}


function buildScript() {

    return gulp
        .src(paths.dirs.script, { base: src })
        .pipe(named())
        .pipe(webpack(webpackConfig, null, (err, stats) => {
	          console.log(stats.toString({
		            colors: true,
		            modules: false,
		            chunks: false,
		            cached: false
	          }))
	          
	      })).on('error', console.log)
        .pipe(gulp.dest(paths.tmp))
	      .pipe(reload({ stream: true }))
}

function buildFont() {
    return gulp
        .src(paths.dirs.font)
        .pipe(gulp.dest(paths.tmp + '/fonts'))
}

function buildImage() {
    return gulp
        .src(paths.dirs.image)
        .pipe(gulp.dest(paths.tmp))
}

var buildAll = gulp.parallel(buildHtml,
			                       buildStyle,
			                       //buildScript,
			                       buildFont,
			                       buildImage)

module.exports = {
    paths: paths
    , clean: clean
    , buildFont: buildFont
    , buildHtml: buildHtml
    , buildImage: buildImage
    , buildScript: buildScript
    , buildStyle: buildStyle
    , buildAll: buildAll
}
