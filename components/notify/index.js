/**
 * Notify.
 */

import { Map } from 'immutable'
import notifyTpl from './notify.njk'

// @todo add hover pause animation
// @todo add callback


// ion-ios-alert-outline
// ion-ios-checkmark-circle-outline
// ion-ios-warning-outline
// ion-ios-notifications-outline

export const NotifyState = {
    Info:    'info',
    Success: 'success',
    Warning: 'warning',
    Error:   'Error'
}

export const NotifyPosition = {
    TopLeft:      'tl',
    TopMiddle:    'tm',
    TopRight:     'tr',
    BottomLeft:   'bl',
    BottomMiddle: 'bm',
    BottomRight:  'br'
}


const defaultOptions = {
    position: NotifyPosition.TopRight,
    state: NotifyState.Info,
    content: ''
}


function constElem(opts) {
    let el = document.createElement('section')
    el.innerHTML = notifyTpl.render(opts)
    return el
}


class Notify {
    constructor(opts, callback) {
	this.opts = Object.assign(defaultOptions, opts)
	this.callback = callback
	
	requestAnimationFrame(this.init.bind(this))
    }
    init() {
	this.con = constElem(this.opts)
	document.body.appendChild(this.con)
	
	this.el = this.con.querySelector('.notify')
	this.show()
    }
    show() {
	this.el.classList.remove('js-notify-state--hide')
	this.el.classList.add('js-notify-state--show')
	setTimeout(() => {
	    this.el.classList.add('js-notify-anim--in')

	    setTimeout(() => {
		this.el.classList.add('js-notify-anim--out')

		setTimeout(() => {
		    
		    this.el.classList.add('js-notify-state--hide')
		    this.el.classList.remove('js-notify-anim--in')
		    this.el.classList.remove('js-notify-anim--out')
		    this.el.classList.remove('js-notify-state--show')
		    document.body.removeChild(this.con)
		    this.callback(this)
		    
		}, 210)
	    }, 2000)
	}, 100)
    }
    close() {
	
    }
    setCallback(fn) {
	this.callback = typeof fn === 'function' ? fn : void 0
	return this
    }
}

class Notifys {
    constructor(opts) {
	this.container = Map()
    }
    addToContainer(notify) {
	/*
	let entity = {}

	entity[+new Date] = notify.setCallback(this.removeFromContainer.bind(this))
	
	this.container.push(entity)
	*/
	
	this.container = this.container.set(notify.setCallback(this.removeFromContainer.bind(this)))
	
	/*
	return new Notifys(this.container.set({
	    key: +new Date,
	    value: notify.setCallback(this.removeFromContainer.bind(this))
	}))
	*/
	return this
    }
    removeFromContainer(notify) {
	//this.container
	//console.log(this.container.get({ key: notify }))
	// @todo remove from list
	console.log(this.container.get(notify))
	

	return this
    }
    of(opts) {
	this.addToContainer(new Notify(opts))
	return this
    }
}

/*
export default function main(opts) {
    return new Notify(opts)
}
*/


export default new Notifys()
