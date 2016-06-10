import 'whatwg-fetch'
import project from 'toml!.project'

console.log(project)


function main() {

    fetch(api('page'))
        .then(res => res.json())
        .then(console.log)


}

main()
