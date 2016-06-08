const fs
    = require('fs')
const path
    = require('path')
const readline
    = require('readline')

function getline(prefix, check, cb) {
    function get_line_inner(text) {
        text = (text + '').trim()
        if (check(text)) {
            cb(text)
            process.stdin.pause()
        } else {
            console.log(prefix)
        }
    }
    console.log(prefix)
    process.stdin.resume()
    process.stdin.on('data', get_line_inner)
}



function main() {
    const help_msg = 'you can use "g" for greate or "d" for remove.';
    const argv = process.argv

    var mode = argv[2]
    if (!mode) {
        console.log('Please enter a mode.', help_msg)
        return
    }

    var pagename = argv[3]

    if (!pagename) {
        getline('Please enter filename:',
            (i) => { return i },
            (pagename) => { main2(mode, pagename) }
        )
    } else {
        main2(mode, pagename)
    }
}

function main2(mode, pagename) {
    pagename = path.normalize(pagename)

    const fpaths = [
        'src/pages/[name].html',
        'src/styles/pages/[name].scss',
        'src/scripts/pages/[name].js'
    ].map((fpath) => {
        return fpath.replace('\[name\]', pagename)
    })

    if (mode == 'g' || mode == 'c') {
        fpaths.forEach((path) => {
            fs.open(path, 'w', (err, fd) => {
                fs.close(fd)
                console.log('created file: ', path)
            })
        })
    } else if (mode == 'd' || mode == 'r') {
        fpaths.forEach((path) => {
            fs.unlink(path, () => {
                console.log('removed file: ', path)
            })
        })
    } else {
        console.log('Unknow mode.', help_msg)
    }
}

main()