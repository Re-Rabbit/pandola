import 'whatwg-fetch'
import iconTpl from 'index/icon.njk'


function api(path) {
    return 'http://localhost:7777/api/' + path
}


function main() {

    fetch(api('page'))
        .then(res => res.json())
        .then(console.log)

    fetch(api('icon'))
        .then(res => res.json())
        .then(res => {
	          var con = document.querySelector('#icons')
	          var datas = res.map(n => iconTpl.render({ name: n.name, code: n.code })).join('')
	          con.innerHTML += datas
        })
}

main()
