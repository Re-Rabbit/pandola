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
                 ]

    function done(paths) {
        console.log('This files or folders would be deleted ', paths.join('\n'))
        console.log('清理完毕')
    }

    del(target).then(done)
}

main()
