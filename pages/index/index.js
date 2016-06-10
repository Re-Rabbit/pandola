import 'babel-polyfill'
import 'whatwg-fetch'
import api from '../../components/apipath/index.js'
import project from 'toml!.project'

console.log(project)

function main() {

    /*
    Promise.resolve(project.contributors)
	.then(res => res.map( n => `https://api.github.com/users/${n.github}`))
	//.then(console.log)
	.then(res => Promise.all(res.map(n => fetch(n))))
	.then(res => Promise.all(res.map(n => n.json())))
	.then(res => res.avatar_url)
    */

    

    let login = document.getElementById('login')
    login.addEventListener('click', evt => {
	//console.log(1)
	//console.log(project)

	var searchParams = new URLSearchParams()
	searchParams.set('client_id', project.oauth.id)
	searchParams.set('redirect_uri', 'http://localhost:8888/')
	searchParams.set('scope', 'user')
	searchParams.set('state', 'test')
	
	let popup = open('https://github.com/login/oauth/authorize?' + searchParams.toString())

	let popupTimer = setInterval(() => {
	    try {
		let codeMatcher = popup.location.search.match(/code=(\w+)/)
		if(codeMatcher) {
		    clearInterval(popupTimer)
		    popup.close()
		    let code = codeMatcher[1]
		    console.log(code)

		    
		    fetch(api('auth/token', { code: code }))
			.then(res => res.json())
			.then(res => console.log(res))
		}
	    } catch(e) {}
	}, 200)
	
    })

}

main()
