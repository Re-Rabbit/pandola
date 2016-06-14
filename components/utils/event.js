/**
 * Event.
 */
import { $, $$ } from 'utils/selector.js'

// @todo cacheable
export function on(name, handle, selector, isCapture = false) {
    return function(el) {
	if(selector) {
	    el.addEventListener(name, (evt) => {
		let root = this
		let body = $('body')
		let els = $$(selector)
		let res = contain()
		
		function contain(el = evt.target) {
		    if(el === root) return false
		    if(el === body) return false
		    let filter = els.find(n => n === el)
		    if(filter) return filter
		    return contain(el.parentNode)
		}

		return res ? handle.bind(res)(evt) : void 0
	    }, isCapture)
	} else {
	    el.addEventListener(name, handle, isCapture)
	}

	return el
    }
}

export function trigger(name) {
    return function(el) {
	let Evt = (() => {
	    switch(name) {
	    case 'keyup':
		return KeyboardEvent
	    default:
		return Event
	    }
	})()
	el.dispatchEvent(new Evt(name))
	return el
    }
}

export function off(name, handle, isCapture = false) {
    return function(el) {
	el.removeEventListener(name, handle, isCapture)
	
	return el
    }
}
