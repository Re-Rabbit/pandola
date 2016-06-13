/**
 * Selector.
 *
 * Base on qs and qsa.
 */

export function $p(scope) {
    return function(selector) {
	return scope.querySelector(selector)
    }
}

export function $$p(scope) {
    return function(selector) {
	return [].slice.call(scope.querySelectorAll(selector))
    }
}

export const $ = $p(document)
export const $$ = $$p(document)


export function $id(id) {
    return document.getElementById(id)
}

export function nth(n) {
    return function(els) {
	return n >= 0 ? els[n] : els.reverse()[Math.abs(n - 1)]
    }
}


export const fst = nth(0)
export const lst = nth(-1)


export function next(el) {
    return el.nextSibling
}

export function prev(el) {
    return el.previousSibling
}
