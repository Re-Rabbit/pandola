// var electron = require('electron')
// var build    = require('./prod.js')

// function main() {
//     var win
    
//     return function(app, BrowserWindow) {
// 	function createWindow() {
// 	    filepath = 'file://' + __dirname + '/../tmp/index.html'
	    
// 	    win = new BrowserWindow({ width: 800, heihgt: 600 })

// 	    win.loadURL(filepath)

// 	    win.webContents.openDevTools()

// 	    win.on('closed', function() {
// 		win = null
// 	    })
// 	}

// 	app.on('ready', createWindow)

// 	app.on('window-all-close', function() {
// 	    if(process.platform !== 'darwin') app.quit()
// 	})

// 	app.on('activate', function() {
// 	    if(win === null) createWindow()
// 	})
//     }
// }


// var app           = electron.app
// var BrowserWindow = electron.BrowserWindow

// main()(app, BrowserWindow)
