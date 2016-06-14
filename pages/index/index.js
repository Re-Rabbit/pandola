import 'babel-polyfill'
import 'whatwg-fetch'
import { $ } from 'utils/selector.js'
import { api, apiPath, Http } from 'utils/http.js'
import project from 'toml!.project'
import commentTpl from './comment.njk'

// @todo popup need return promise
// @todo ls need return promise
// @todo cache user avatar
// @todo catch user github token
// @todo get github code from api server
// @todo add comment adapter
// @todo add socket server

function popup(path) {
    return new Promise((res, rej) => {

    })
}




class LS {
    constructor(flag) {
	      this.flag = flag
	      this.proxy = localStorage
	      this.init()
    }
    init() {
	      this.data = this.read() || {}
	      this.write(this.data)
    }
    read() {
	      return JSON.parse(this.proxy.getItem(this.flag))
    }
    write() {
	      this.proxy.setItem(this.flag, JSON.stringify(this.data || {}))
	      return this
    }
    get(key) {
	      return this.data[key]
    }
    set(key, value) {
	      let proxy = this.proxy
	      this.data[key] = value
	      this.write(this.data)
	      return this
    }
    empty() {
	      this.proxy.write()
	      return this
    }
    clear() {
	      this.proxy.removeItem(flag)
	      return this
    }
}

var ls = new LS('pandora')

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
    let token = ls.get('token')

    login.addEventListener('click', evt => {
	      if(!token) {

	          var searchParams = new URLSearchParams()
	          searchParams.set('client_id', project.oauth.id)
	          searchParams.set('redirect_uri', 'http://localhost:8888/')
	          searchParams.set('scope', 'user,repo,gist,admin:org,notifications,public_repo')
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

			                  //api('auth/code')
			                  api('auth/token', { code: code })
			                      .then(res => ls.set('token', res.token))

		                }
		            } catch(e) {}
	          }, 200)
	      } else {
	          api('auth/user', { token: token })
		            .then(res => {
		                $('#avatar').setAttribute('src', res.avatar_url)
		            })
	      }

    })

    api('auth/discuss', { token: token })
	      .then(res =>
	            res.map(n => ({
		              body: n.body,
		              date: n.created_at,
		              avatar: n.user.avatar_url,
		              name: n.user.login
	            }))
	           )
	      .then(res => res.map( n => commentTpl.render(n)))
	      .then(res => $('#comments').innerHTML = res.join(''))


    $('#comment-commit').addEventListener('click', () => {
	      let value = $('#comment-body').value
	      Http.post(apiPath('auth/discuss'), { body: value, token: token })

	      console.log(value)
    })

}

main()
