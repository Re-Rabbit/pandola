var request = require('request')
var url = require('url')
var querystring  = require('querystring')
var path = require('path')
var fs = require('fs')
var toml = require('toml')

var project = toml.parse(fs.readFileSync('./.project'))
var authConfig = project.oauth

var githubTokenPath = 'https://github.com/login/oauth/access_token'

function githubTokenParams(code) {
    return {
	client_id: authConfig.id,
	client_secret: authConfig.key,
	redirect_uri: 'http://localhost:8888/',
	code: code,
	state: 'test'
    }
}

function main(api) {
    api.get('/auth/token', function(req, res) {

	var reqPath = githubTokenPath + '?' + querystring.stringify(githubTokenParams(req.query.code))
	
	request(reqPath, function(err, getTokenRes, body) {
	    if(err) return console.log(err)
	    res.send(querystring.parse(body))
	})
    })
}

module.exports = main
