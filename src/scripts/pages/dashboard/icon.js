import 'whatwg-fetch'
import api from 'apipath.js'
import iconTpl from 'index/icon.njk'

console.log(api.toString())

function replaceTpl(icon) {
    return iconTpl.render({
        name: icon.name,
        code: icon.code
    })
}

function appendToContainer(con, ctx) {
    requestAnimationFrame(() => con.innerHTML = ctx)
}


function main() {

    fetch(api('icon'))
        .then(res => res.json())
        .then(res => {
	          var con = document.querySelector('#icons')
	          var datas = res.map(replaceTpl).join('')
            appendToContainer(con, datas)
        })
}

main()
