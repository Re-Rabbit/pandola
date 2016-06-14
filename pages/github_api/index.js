import 'whatwg-fetch'
import { $ } from 'utils/selector.js'

var github_api_base = 'https://api.github.com/'
var github_api = {
    base: github_api_base,
    user: github_api_base + 'user',
}


function main() {
    var avatar = $('.avatar')
    var login = $('.login')
    var debug = $('#debug')


    login.addEventListener('click', (evt) => {
        console.log('click')
        fetch(github_api.user)
            .then(function (response) {
                return response.json()
            })
            .then(function(json){
                console.log(json)
                debug.innerHTML = json
            })
    })
}

main()
