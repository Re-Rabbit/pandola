/**
 * Document object utils.
 */

export function setHtml(str) {
    return function(el) {
	el.innerHTML = str
	return el
    }
}

export function getHtml(el) {
    return el.innerHTML
}

export const empty = setHtml('')

export function append(el) {
    return function(con) {
	return con.appendChild(el)
    }
}

export function remove(el) {
    return function(con) {
	return con.removeChild(el)
    }
}

export function setText(str) {
    return function(el) {
	el.textContent = str
	return el
    }
}

export function getText(el) {
    return el.textContent
}

/**
 * Attribute.
 */

export function setProp(name) {
    return function(value) {
	return function(el) {
	    el.setAttribute(name, value)
	    return el
	}
    }
}

export function toggleProp(name) {
    return function(el) {
	return setProp(name, !el.getProp(name), el)
    }
}

export function getProp(name) {
    return function(el) {
	return el.getAttribute(name)
    }
}

export function removeProp(name) {
    return function(el) {
	el.removeAttribute(name)
	return el
    }
}

/**
 * ClassName
 */
export function addClass(name) {
    return function(el) {
	el.classList.add(name)
	return el
    }
}

export function toggleClass(name) {
    return function(el) {
	el.classList.toggle(name)
	return el
    }
}

export function removeClass(name) {
    return function(el) {
	el.classList.remove(name)
	return el
    }
}



// @todo insertAdjacentHTML
function perpend() {}
function after() {}
function before() {}
