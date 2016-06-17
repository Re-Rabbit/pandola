'use strict'

const chalk = require('chalk')

function replaceFstChar(str) {
    return str.replace(/(\w)(\w+)/, (f, a, b) => a.toUpperCase() + b)
}

class Flag {
    constructor(flag, color) {
	this.flag  = flag
	this.color = color
    }
    toStr() {
	return chalk['bg' + replaceFstChar(this.color)](chalk.bold((this.flag)))// + chalk[this.color]('\u25ba')
    }
}

const Flag_WrokSpace = new Flag('WorkSpace', 'magenta')
const Flag_CSS = new Flag('CSS ', 'blue')
const Flag_HTML = new Flag('HTML', 'green')
const Flag_JS = new Flag('JavaScript', 'yellow')
const Flag_File = new Flag('File', 'red')
const Flag_BS = new Flag('Browser', 'cyan')

const flagPad = 2

const Result_Ok = '\u25cf'//'\u221a'
const Result_Err = '\u25cf' //'\u03c7'

const flagMaxLen = (() => {
    return [
	Flag_WrokSpace,
	Flag_CSS,
	Flag_HTML,
	Flag_JS,
	Flag_File,
	Flag_BS
    ].reduce((acc, curr) => Math.max(acc, curr.flag.length), 0) + 2
})()

const flag = normalizeFlags({
    workspace: Flag_WrokSpace,
    css: Flag_CSS,
    html: Flag_HTML,
    js: Flag_JS,
    file: Flag_File,
    browser: Flag_BS
})

/**
 * Utils.
 */
function pad(len) {
    return Array(len).fill(' ').join('')
}

function flagPadCenter(max) {
    return function(flag) {
	var content = flag.flag
	var space = max - content.length
	var left = Math.ceil(space / 2)
	return pad(left) + content + pad(space - left)
    }
}

function normalizeFlags(flags) {
    const nor = flagPadCenter(flagMaxLen)
    for(let k in flags) {
	flags[k].flag = nor(flags[k])
    }
    return flags
}

function fmtTime(time) {
    return time < 1000 ? [time.toString(), 'ms'] : [(time / 1000).toString(), 's']
}

/**
 * Faces.
 */
const workspaceLen = 15

function defineFaceWorkspace(workspace) {
    let len  = workspace ? workspace.length : 0
    let padw = len < workspaceLen ? pad(workspaceLen - len) : ''
    return chalk.gray('{') + chalk.magenta(workspace || 'all') + chalk.gray('}')  + padw
}

function defineFaceTime(time) {
    let timef = fmtTime(time)
    return chalk.bold(chalk.blue(timef[0])) + ' ' + chalk.gray(timef[1])
}

function defineFaceThen() {
    return chalk.gray(' >>= ')
}

function defineFaceFile(file) {
    return chalk.green(file)
}

function defineFaceResultOk() {
    return chalk.green(Result_Ok)
}

function defineFaceResultErr() {
    return chalk.red(Result_Err)
}

/**
 * Logger.
 */
function log(f, content) {
    if(f && f instanceof Flag) {
	const arg = [].slice.call(arguments, 1)
	process.nextTick(() => {
	    console.log.apply(null, [].concat(f.toStr()).concat(arg))
	})
    } else {
	console.log.apply(null, [].slice.call(arguments))
    }
}

function logWorkSpace(workspace) {
    let out = ''
    out += 'SwitchTo '
    out += defineFaceWorkspace(workspace)
    return log(flag.workspace, out)
}

function logCSS(workspace, file, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    //out += ' '
    //out += defineFaceResultOk()
    out += defineFaceTime(during)
    out += '\t'
    out += defineFaceFile(file)    
    return log(flag.css, out)
}

function logHTML(workspace, file, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    out += '\t'
    out += defineFaceFile(file)
    return log(flag.html, out)
}

function logJs(workspace, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    return log(flag.js, out)
}

function logFile(file) {
    let out = ''
    out += 'Changed '
    out += file
    out += defineFaceThen()
    out += 'ReBuild...'
    return log(flag.file, out)
}

function logBrowser(workspace, info) {
    let out = ''
    out += 'ServerOn '
    out += defineFaceWorkspace(workspace)
    out += ' '
    out += info
    return log(flag.browser, out)
}

function logErrFlag() {
    let out = ''
    out += '\n'
    out += pad(20)
    out += chalk.bgRed(chalk.bold(' ERROR '))
    out += '\n'
    return console.log(out)
}

function logErrFile(file) {
    let out = ''
    out += defineFaceResultErr()
    out += ' '
    out += file
    return console.log(out)
}

function logErrPosition(line, col) {
    let out = ''
    out += defineFaceResultErr()
    out += ' '
    out += 'on line '
    out += chalk.yellow(line)
    out += ' '
    out += 'column '
    out += chalk.yellow(col)
    return console.log(out)
}

function logNewLine() {
    return console.log('\n')
}

module.exports = {
    flag: flag,
    pad: pad,
    say: log,
    log: {
	workspace: logWorkSpace,
	css: logCSS,
	html: logHTML,
	js: logJs,
	file: logFile,
	browser: logBrowser,
	errFlag: logErrFlag,
	errFile: logErrFile,
	errPos: logErrPosition,
	n: logNewLine
    }
}
