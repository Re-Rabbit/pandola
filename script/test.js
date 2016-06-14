const fs = require('fs')
const glob = require('glob')
const path = require('path')

function globPromise(pattern) {
    return new Promise((res, rej) => {
	glob(pattern, (err, files) => {
	    if(err) return rej(err)
	    res(files)
	})
    })
}

function readFilePromise(file) {
    return new Promise((res, rej) => {
	fs.readFile(file, 'utf-8', (err, data) => {
	    if(err) return rej(err)
	    res(data)
	})
    })
}

function reversePageDependents() {
    globPromise('./pages/**/index.js')
	.then(res => Promise.all(res.map(readFilePromise)))
	.then(res => res.map(n => {
	    return n.match(/import.+from.+\.(js|njk)\s*/g)
	}))
	.then(res => res.map(n => {
	    return n.map(m => m.match(/from\s*(.+)/)[1])
	}))
	.then(console.log)
}

reversePageDependents()
