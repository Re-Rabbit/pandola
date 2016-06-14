import 'whatwg-fetch'
import Clipboard from 'clipboard'
import IScroll from 'iscroll'
import { $, $$ } from 'utils/selector.js'
import { api } from 'utils/http.js'
import { on, trigger, off } from 'utils/event.js'
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
import tips from 'tips/index.js'
import iconTpl from './icon.njk'
import iconTagsTpl from './icon-tags.njk'
import iconIconsTpl from './icon-icons.njk'
import iconFinderTpl from './icon-finder.njk'



function filterErrorIcons(data) {
    return data.filter(res => res.code)
}



// Effects

/**
 * Search matched icons.
 *
 * Trigger on init and search bar typed.
 */
function searchIcon(icons) {
    function findMatchedIcon(call) {
	return function(data) {
	    return data.filter(res => call(res.name))
	}
    }
    
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

    function mountScroller() {
	let scroller = new IScroll('.js-icons-scroller', {
	    scrollbars: true,
	    mouseWheel: true,
	    interactiveScrollbars: true,
	    shrinkScrollbars: 'scale',
	    fadeScrollbars: true,
	    disablePointer: true,
	    disableTouch: true,
	    disableMouse: false
	})
	return function() {
	    scroller.refresh()
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
		next(scroller)
	    })
	    
    }

    const container = $('#icons')
    const search    = $('#search')
    const count     = $('#count')
    const tplRender = renderTpl(iconTpl)
    const scroller  = mountScroller()

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

	makeScrollerForFinder()
    }

    function closeIconDetail() {
	removeClass('js-icons-detail-active-hook')(body)
    }


    on('click', clickHandle, '.icon')(container)
    on('click', closeIconDetail)(close)
}

function mountTipsWithFinder() {


    function leaveHandle(target) {
	return function leaved() {
	    target.close(target.remove)
	    off('mouseleave', leaved)(this)
	}
    }
    
    function enterHandle(evt) {
	if(this !== evt.target) return

	const target = tips({ content: this.dataset.name, container: this })
	target.open()
	on('mouseleave', leaveHandle.bind(this)(target))(this)
    }

    const container  = $('#icons-detail')
    
    on('mouseenter', enterHandle, '.icons-detail-finder__item', true)(container)
}

function makeScrollerForFinder() {
    const container = $('#icon-finder')

    function mountIScroll() {
	let ser = new IScroll(container, {
	    scrollbars: true,
	    mouseWheel: true,
	    interactiveScrollbars: true,
	    shrinkScrollbars: 'scale',
	    fadeScrollbars: true,
	    click: true
	})
    }

    next(mountIScroll)
}


function main() {
    PL('icon')
	.then(api)
	.then(filterErrorIcons)
	.then(searchIcon)
        .then(openDetailPanel)
	.then(mountTipsWithFinder)
	.then(copyToClipBoard)
}

main()

