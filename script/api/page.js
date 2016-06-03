var fs  = require('fs')

function isHtmlExtension(n) {
    return /html$/.test(n)
}

function exceptIndex(n) {
    return n !== 'index'
}

function checkoutFilename(n) {
    return n.match(/([\w|\-]+).html$/)[1]
}

function main(api) {
    api.get('/page', function(req, res) {

	fs.readdir('./src/pages', function(err, data) {
            if(err) return console.log(err)

            res.send(data
		     .filter(isHtmlExtension)
		     .map(checkoutFilename)
		     .filter(exceptIndex))
	})
    })
}

module.exports = main
