export function next(fn) {
    return new Promise((res, rej) => {
	let timer = requestAnimationFrame(() => {
	    fn()
	    res(timer)
	})
    })
}

export function delay(timeout = 0) {
    return function(fn) {
	return new Promise(res => {
	    let timer = setTimeout(() => {
		fn()
		res(timer)
	    }, timeout)
	})
    }
}

export function waitFor(elem) {
    return function(fn) {
	return new Promise(res => {
	    function handle() {
		fn()
		res()
		elem.removeEventListener('transitionend', handle)
	    }
	    elem.addEventListener('transitionend', handle)
	})
    }
}

export function now() {
    return performance.now()
}

export function PL(val) {
    return Promise.resolve(val)
}

export function id(val) {
    return val
}

export function log(val) {
    console.log(val)
    return val
}

export function logFlag(flag) {
    return function(...val) {
	console.log([].concat(flag).concat([].slice.call(val)))
	return val
    }
}

export function isBlank(str) {
    return str.trim() === '' ? true : false
}

export function composeTpl(fn) {
    return function(data) {
	return data.map(fn).join('')
    }
}

export function renderTpl(tpl) {
    return function(entity) {
	return tpl.render(entity)
    }
}

export function isRegexMatched(re) {
    return function(test) {
	return re.test(test)
    }
}
