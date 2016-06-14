/**
 * Http.
 *
 * 通信
 */

import 'whatwg-fetch'
import project from 'toml!.project'


function keyAsValue(flag) {
    let out = {}
    out[flag] = flag
    return out
}

function composeKeyAsValues(...flags) {
    return flags.reduce((acc, curr) => Object.assign(acc, keyAsValue(curr)), {})
}


export const Post_Type = composeKeyAsValues('JSON', 'URL')
const Request_Method = composeKeyAsValues('GET', 'POST', 'PATCH', 'DELETE')


function headerPostDataUrlEncodeed() {
	  return {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

function headerPostDataJson() {
	  return {
        'Content-Type': 'application/json'
    }
}


function headerAuthorization(token) {
    return {
        'X-Pandola-Token': token
    }
}


const defaultOption = {
    path: '',
    search: null,
    body: null,
    method: Request_Method.GET,
    postType: Post_Type.JSON,
    token: ''
}

function fetchAPIAdapter({ path, search, body, method, postType, token }) {

    let option = {}

    if(token) {
        option = Object.assign(header, {
            headers: {
                //headerAuthorization(token)
            }
        })
    }

    if(method === Request_Method.GET) {
        fetch(normalizePath(path, search), option)
    } else {
        fetch(normalizePath(path, search), Object.assign(option
                                                        ))
    }
}


function searchParamsParser(params) {
    var queryString = new URLSearchParams()

    for(var k in params) {
	      queryString.set(k, params[k])
    }

    return queryString.toString()
}

export function toJson(data) {
    return data.json()
}

function httpGet(path, opts = {}) {
    return fetch(path, opts)
}


function httpPost(path, body) {
    return fetch(path, Object.assign({
	      method: 'POST',
	      headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      },
	      body: searchParamsParser(body)
    }))
}

//@todo post patch delete
function httpPatch() {

}

function httpDelete() {

}

function normalizePath(path, search) {

    let apipath = apiPath(path)

    if(search) {
        return `${apipath}?${searchParamsParser(search)}`
    } else {
        return `${apipath}`
    }
}

export function apiPath(path) {
    return `${project.api}/${path}`
}



export function api(path, params = null, opts = {}) {
    let queryStr = params ? searchParamsParser(params) : ''
    let normalizePath = `
    ${apiPath(path)}?${queryStr}
    `
    return httpGet(normalizePath, opts).then(toJson)
}


export function authApi(token) {
    return function (path, params = null, opts = {}) {
        return api(path, params, Object.assign({}, opts, headerAuthorization(token)))
    }
}

export const Http = {
    get: httpGet,
    post: httpPost,
    patch: httpPatch,
    "delete": httpDelete
}
