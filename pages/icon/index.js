import 'whatwg-fetch'
import Clipboard from 'clipboard'
import { $, $$ } from 'utils/selector.js'
import { api } from 'utils/http.js'
import { on, trigger } from 'utils/event.js'
import {
    setHtml,
    setText,
    addClass,
    removeClass
} from 'utils/dom.js'
import {
    PL,
    next,
    id,
    isBlank,
    log,
    renderTpl,
    composeTpl,
    isRegexMatched
} from 'utils/util'
import notify from 'notify/index.js'
import iconTpl from './icon.njk'
import iconTagsTpl from './icon-tags.njk'
import iconIconsTpl from './icon-icons.njk'
import iconFinderTpl from './icon-finder.njk'



function filterErrorIcons(data) {
    return data.filter(res => res.code)
}

function findMatchedIcon(call) {
    return function(data) {
	      return data.filter(res => call(res.name))
    }
}



// Effects

/**
 * Search matched icons.
 *
 * Trigger on init and search bar typed.
 */
function searchIcon(icons) {
    function renderIcons(content) {
	      return function() {
	          setHtml(content)(container)
	      }
    }

    function renderIconCount(icons) {
	      return function() {
	          setHtml(icons.length)(count)
	      }
    }

    function keyUpHandle(evt) {
	      let value = evt.target.value.trim()
	      let isMatched = isRegexMatched(new RegExp(`${value}`))
	      let findIcon = isBlank(value) ? id : findMatchedIcon(isMatched)

	      PL(icons)
	          .then(findIcon)
	          .then(res => Promise.all([
		            composeTpl(tplRender)(res),
		            renderIconCount(res)
	          ]))
	          .then(([str, fn]) => {
		            next(fn)
		            next(renderIcons(str))
	          })
    }

    const container = $('#icons')
    const search    = $('#search')
    const count     = $('#count')
    const tplRender = renderTpl(iconTpl)

    PL(search)
	      .then(on('keyup', keyUpHandle))
	      .then(trigger('keyup'))

    return icons
}

/**
 * Copy to system clipboard.
 */
function copyToClipBoard() {
    function copySuccessHandle(evt) {
	      notify.of({
	          position: 'bm',
	          state: 'success',
	          content: `已复制 ${evt.text} 到剪贴板`
	      })

	      evt.clearSelection()
    }

    function copyErrorHandle(evt) {
	      notify.of({ state: 'error', content: `复制失败` })
    }

    let clipboard = new Clipboard('.icon')

    clipboard.on('success', copySuccessHandle)
    clipboard.on('error', copyErrorHandle)

}

/**
 * Open detail panel
 */
function openDetailPanel(icons) {
    const container  = $('#icons')
    const body       = $('body')
    const close      = $('#close')
    const iconName   = $('#icon-name')
    const iconTags   = $('#icon-tags')
    const iconIcons  = $('#icon-icons')
    const iconFinder = $('#icon-finder')
    const tagsTpl    = renderTpl(iconTagsTpl)
    const iconsTpl   = renderTpl(iconIconsTpl)
    const finderTpl  = renderTpl(iconFinderTpl)

    function findSameTagIcon(tag) {
        return icons
            .filter(n => n.tags.includes(tag))
            .map(n => n.name)
    }


    function clickHandle(evt) {
        let { name, tags, code, group } = this.dataset
        let tagsArr = tags.split(',')

        setText(name)(iconName)
        setHtml(tagsTpl({ tags: tagsArr }))(iconTags)
        setHtml(iconIconsTpl.render({ name: name }))(iconIcons)
        setHtml(iconFinderTpl.render({
            icons: icons.filter(n => n.tags.includes(tagsArr[0])).map(n => n.name)
        }))(iconFinder)

	      addClass('js-icons-detail-active-hook')(body)
    }

    function closeIconDetail() {
	      removeClass('js-icons-detail-active-hook')(body)
    }


    on('click', clickHandle, '.icon')(container)
    on('click', closeIconDetail)(close)
}


function main() {
    PL('icon')
	      .then(api)
	      .then(filterErrorIcons)
	      .then(searchIcon)
        .then(openDetailPanel)
	      .then(next(copyToClipBoard))
}

main()

