import 'whatwg-fetch'
import { $ } from 'utils/selector.js'
import project from 'toml!.project'

var github_api_base = 'https://api.github.com/'
var github_api = {
    base: github_api_base,
    user: github_api_base + 'user',
}

function window_get_token(evt) {
    var search = evt.target.location.search
    if(search.startsWith('?')) {search = search.substr(1)}
    var searchParams = new URLSearchParams(search)
    var token = searchParams.get('code')
    evt.target.close()
    return token
}

function get_auth_token(client_id, scope){
    var searchParams = new URLSearchParams()
    searchParams.set('client_id', client_id)
    searchParams.set('redirect_uri', 'http://localhost:8888/github_api/set_token/')
    searchParams.set('scope', scope)
    searchParams.set('state', 'test')
    
    var auth_page = open('https://github.com/login/oauth/authorize?' + searchParams.toString())
    auth_page.cb = token => {
        console.log(token)
        alert(token)
    }
}



function main() {
    var avatar = $('.avatar')
    var login = $('.login')
    var debug = $('#debug')


    login.addEventListener('click', (evt) => {
        console.log('click')
        get_auth_token(project.oauth.id, 'user,repo,gist,admin:org,notifications,public_repo')
        // fetch(github_api.user)
        //     .then(function (response) {
        //         return response.json()
        //     })
        //     .then(function(json){
        //         console.log(json)
        //         debug.innerHTML = json
        //     })
    })
}

main()
