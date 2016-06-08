import 'whatwg-fetch'
import api from 'apipath.js'
import iconTpl from 'index/icon.njk'


function replaceTpl(icon) {
    return iconTpl.render(icon)
}

function appendToContainer(con) {
    return function(ctx) {
	return function() {
	    con.innerHTML = ctx
	}
    }
}

function reMatch(re) {
    return function(ctx) {
	return re.test(ctx)
    }
}

function replaceAndConcatTpl(tplCall) {
    return function(data) {
	return data.map(tplCall).join('')
    }
}

function findMatchedIcon(call) {
    return function(data) {
	return data.filter(res => call(res.name))
    }
}


function main() {

    const container = document.querySelector('#icons')
    const search = document.querySelector('#search')

    fetch(api('icon'))
        .then(res => res.json())
	.then(res => {
	    search.addEventListener('keyup', (evt) => {
		let value = evt.target.value.trim()
		let reMatchValue = new RegExp(`${value}`)
		let tpls = replaceAndConcatTpl(replaceTpl)
		let finder = findMatchedIcon(reMatch(reMatchValue))
		

		let iconTpls = value === '' ? tpls(res) : tpls(finder(res))

		requestAnimationFrame(appendToContainer(container)(iconTpls))
	    })
	    
	    search.dispatchEvent(new KeyboardEvent('keyup'))
	})
}

main()
