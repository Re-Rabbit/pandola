import project from 'toml!.project'

function searchParamsParse(params) {
    var queryString = new URLSearchParams()
    
    for(var k in params) {
	queryString.set(k, params[k])
    }

    return queryString.toString()
}

function toJson(data) {
    return data.json()
}

function httpGet(path) {
    return fetch(path)
}

//@todo post patch delete
function httpPost(path, body) {
    return fetch(path, Object.assign({
	method: 'POST',
	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: searchParamsParse(body)
    }))
}

function httpPatch() {

}

function httpDelete() {

}

export function apiPath(path) {
    return `${project.api}/${path}`
}

export function api(path, params = null) {
    let normalizePath = `
${apiPath(path)}?${params ? searchParamsParse(params) : ''}
`
    return httpGet(normalizePath).then(toJson)
}

export const Http = {
    get: httpGet,
    post: httpPost,
    patch: httpPatch,
    "delete": httpDelete
}

