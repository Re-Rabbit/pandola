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

var githubUserPath = 'https://api.github.com/user'

function main(api) {
    api.get('/auth/token', function(req, res) {

	var reqPath = githubTokenPath + '?' + querystring.stringify(githubTokenParams(req.query.code))
	
	request(reqPath, function(err, getTokenRes, body) {
	    if(err) return console.log(err)
	    res.send({ token: querystring.parse(body).access_token })
	})
    })

    api.get('/auth/user', function(req, res) {
	
	request({
	    url: githubUserPath,
	    headers: {
		"Authorization": "token " + req.query.token,
		"Content-Type": "application/json",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"
	    }
	}, function(err, getTokenRes, body) {
	    if(err) return console.log(err)
	    res.send(JSON.parse(body))
	})
    })

    api.get('/auth/discuss', function(req, res) {
	const path = 'https://api.github.com/repos/re-rabbit/pandola/issues/1/comments'
	request({
	    url: path,
	    headers: {
		"Authorization": "token " + req.query.token,
		"Content-Type": "application/json",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"
	    }
	}, function(err, getTokenRes, body) {
	    if(err) return console.log(err)
	    res.send(JSON.parse(body))
	})
    })

    api.post('/auth/discuss', function(req, res) {
	var path = 'https://api.github.com/repos/re-rabbit/pandola/issues/1/comments'
	var body = req.body.body
	request({
	    method: 'POST',
	    url: path,
	    headers: {
		"Authorization": "token " + req.body.token,
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"
	    },
	    form: {
		body: body
	    }
	}, function(err, response, body) {
	    if(err) return console.log(err)
	    if(response.statusCode === 201) {
		res.send({ state: true })
	    } else {
		console.log(response.statusCode)
		console.log(response.body)
		return
	    }
	})
    })


    //https://api.github.com/repos/re-rabbit/pandola/issues
}

module.exports = main
