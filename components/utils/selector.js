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
