/**
 * Tips
 *
 * 提示
 */
import tipsTpl from './tips.njk'
import { $p } from 'utils/selector'
import {
    next,
    delay,
    waitFor,
    log
} from 'utils/util'
import {
    setHtml,
    append,
    remove,
    addClass
} from 'utils/dom.js'

// @todo check container position is relative

const Tips_Position = {
    Top:    'top',
    Right:  'right',
    Bottom: 'bottom',
    Left:   'left'
}

const defaultOptions = {
    position: Tips_Position.Bottom,
    content: ' ',
    container: null
}

class Tips {
    constructor(opts) {
	this.opts = Object.assign({}, defaultOptions, opts)
	this.init()
    }
    init() {
	this.con = document.createElement('section')
	setHtml(tipsTpl.render(this.opts))(this.con)
	this.el = $p(this.con)('.tips')
	addClass('js-anim--in')(this.el)
	append(this.con)(this.opts.container)

	return this
    }
    open() {
	next(() => addClass('js-anim--enter')(this.el))
	    .then(res => this.timer = res)
	return this.el
    }
    close(cb) {
	next(() => {
	    if(this.timer) cancelAnimationFrame(this.timer)
	    addClass('js-anim--leave')(this.el)
	})
	    .then(waitFor(this.el)(cb.bind(this)))
    }
    remove() {
	remove(this.con)(this.opts.container)
    }
}

export default function main(opts) {
    return new Tips(opts)
}
