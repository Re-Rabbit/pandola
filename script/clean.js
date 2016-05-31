/**
 * Clean project
 *
 * 清理文件夹
 */
var del   = require('del')
var paths = require('./paths.js')

/**
 * Main task
 */
function main() {
    var target = [ paths.tmp
                 , paths.dist
                 , paths.publish
		 , './npm-debug.log'
                 ]

    function done(paths) {
	if(paths.length)
            console.log('This files or folders would be deleted ', paths.join('\n'))
        console.log('workspace clear.')
    }

    del(target).then(done)
}

main()
