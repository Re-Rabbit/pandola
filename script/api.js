var fs  = require('fs')
var api = require('express').Router()

api.get('/page', function(req, res) {

    function isHtmlExtension(n) {
        return /html$/.test(n)
    }

    function checkoutFilename(n) {
        return n.match(/(\w+).html$/)[1]
    }

    fs.readdir('./src/pages', function(err, data) {
        if(err) return console.log(err)

        res.send((data.filter(isHtmlExtension).map(checkoutFilename)))
    })
})

module.exports = api
