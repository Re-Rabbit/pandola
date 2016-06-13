export function next(fn) {
    return new Promise((res, rej) => {
	requestAnimationFrame(() => {
	    fn()
	    res()
	})
    })
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
