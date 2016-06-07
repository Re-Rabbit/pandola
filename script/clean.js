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
            console.log('This files or folders would be deleted\n',
                        paths.map(function(p) { return '* ' + p }).join('\n')
                       )
        console.log('\nworkspace clear.')
    }

    del(target).then(done)
}

main()
