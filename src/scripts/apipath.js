import project from 'toml!.project'

export default function api(path) {
    return `${project.api}/${path}`
}
