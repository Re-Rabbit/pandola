import 'whatwg-fetch'
import Clipboard from 'clipboard'
import { $ } from 'utils/selector.js'
import { api } from 'utils/http.js'
import notify from 'notify/index.js'
import iconTpl from './icon.njk'


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

function filterErrorIcons(data) {
    return data.filter(res => res.code)
}

function reMatch(re) {
    return function(ctx) {
	return re.test(ctx)
    }
}

function replaceAndConcatTpl(tplCall) {
    return function(data) {
	return data.map(tplCall.bind(this)).join('')
    }
}

function findMatchedIcon(call) {
    return function(data) {
	return data.filter(res => call(res.name))
    }
}


// Effects

function getIcons() {
    return api('icon')
}

function searchIcon(icons) {
    const container = $('#icons')
    const search    = $('#search')
    const count     = $('#count')

    function eventBinding(evt) {
	let value = evt.target.value.trim()
	let reMatchValue = new RegExp(`${value}`)
	let tpls = replaceAndConcatTpl(replaceTpl)
	let finder = findMatchedIcon(reMatch(reMatchValue))
	let render = appendToContainer(container)

	let iconTpls = value === '' ? tpls(icons) : tpls(finder(icons))

	requestAnimationFrame(render(iconTpls))


        $('#count').innerHTML = icons.length
    }


    search.addEventListener('keyup', eventBinding)
    search.dispatchEvent(new KeyboardEvent('keyup'))
}

function copyToClipBoard() {
    let clipboard = new Clipboard('.icon')

    clipboard.on('success', function(e) {

	notify.of({ position: 'tr', state: 'success', content: `已复制 ${e.text} 到剪贴板` })

	e.clearSelection()
    })

    clipboard.on('error', function(e) {
	notify.of({ state: 'error', content: `复制失败` })
    });
}


function main() {

    Promise.resolve('My icons plans.')
	.then(getIcons)
	.then(filterErrorIcons)
	.then(searchIcon)
	.then(copyToClipBoard)
}

main()
