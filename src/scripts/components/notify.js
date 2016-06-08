/**
 * Notify.
 */

import notifyTpl from 'components/notify.njk'


// ion-ios-alert-outline
// ion-ios-checkmark-circle-outline
// ion-ios-warning-outline
// ion-ios-notifications-outline


const defaultOptions = {
    position: 'tr',
    state: 'success',
    content: '测试测试测试'
}


function constElem(opts) {
    let el = document.createElement('section')
    el.innerHTML = notifyTpl.render(opts)
    return el
}


class Notify {
    constructor(opts) {
	this.opts = Object.assign(defaultOptions, opts)
	
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
		    //document.body.removeChild(this.con)
		    
		}, 210)
	    }, 2000)
	}, 100)
    }
    close() {
	
    }
}

export default function main(opts) {
    return new Notify(opts)
}
