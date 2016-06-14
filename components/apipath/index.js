import project from 'toml!.project'

function searchParamsParse(params) {
    var queryString = new URLSearchParams()
    
    for(var k in params) {
	queryString.set(k, params[k])
    }

    return queryString.toString()
}

export default function api(path, params = null) {
    if(params) {
	return `${project.api}/${path}?${searchParamsParse(params)}`
    } else {
	return `${project.api}/${path}`
    }
}
