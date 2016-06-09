import 'whatwg-fetch'
import api from 'apipath.js'
import Clipboard from 'clipboard'
import iconTpl from 'index/icon.njk'
import notify from 'components/notify.js'


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

function toJson(data) {
    return data.json()
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
        .then(toJson)
	      .then(filterErrorIcons)
	      .then(res => {
	          function eventBinding(evt) {
		            let value = evt.target.value.trim()
		            let reMatchValue = new RegExp(`${value}`)
		            let tpls = replaceAndConcatTpl(replaceTpl)
		            let finder = findMatchedIcon(reMatch(reMatchValue))

		            let iconTpls = value === '' ? tpls(res) : tpls(finder(res))

		            requestAnimationFrame(appendToContainer(container)(iconTpls))


                document.querySelector('#count').innerHTML = res.length
	          }


	          search.addEventListener('keyup', eventBinding)
	          search.dispatchEvent(new KeyboardEvent('keyup'))

	          let clipboard = new Clipboard('.icon')

	          clipboard.on('success', function(e) {

		            notify.of({ position: 'bm', state: 'success', content: `已复制 ${e.text} 到剪贴板` })

		            e.clearSelection()
	          })

	          clipboard.on('error', function(e) {
		            notify.of({ state: 'error', content: `复制失败` })
	          });

	      })
}

main()
