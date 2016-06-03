function api(path) {
    return 'http://localhost:7777/api/' + path
}

fetch(api('page'))
    .then(res => res.json())
    .then(console.log)

fetch(api('icon'))
    .then(res => res.json())
    .then(res => {
	var con = document.querySelector('#icons')
	var datas = res.map(replaceIconTemplate).join('')
	con.innerHTML += datas
    })

var tempIcon = document.querySelector('#icon').innerHTML

function replaceIconTemplate(icon) {
    return tempIcon.replace(/{{name}}/g, icon.name)
	.replace(/{{code}}/g, icon.code || 'error')
}
