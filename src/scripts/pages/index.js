import 'whatwg-fetch'
import iconTpl from 'index/icon.njk'


function api(path) {
    return 'http://localhost:7777/api/' + path
}


function replaceIconTemplate(temp) {
    return function(icon) {
        return temp.replace(/{{name}}/g, icon.name)
	    .replace(/{{code}}/g, icon.code || 'error')
    }
}


function main() {

    var temp = document.querySelector('#icon').innerHTML

    fetch(api('page'))
        .then(res => res.json())
        .then(console.log)

    fetch(api('icon'))
        .then(res => res.json())
        .then(res => {
	    var con = document.querySelector('#icons')
	    var datas = res.map(replaceIconTemplate(temp)).join('')
	    con.innerHTML += datas
        })
}

main()
