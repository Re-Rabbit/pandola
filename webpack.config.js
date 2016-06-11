const webpack = require('webpack')
const path    = require('path')

module.exports = {
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }, {
            test: /\.njk$/,
            loader: 'nunjucks'
        }]
    },
    resolve: {
        root: [
            path.resolve('./'),
	    path.resolve('./components')
        ]
    },
    plugins: [
	new webpack.optimize.CommonsChunkPlugin('commons.js')
    ]
}
