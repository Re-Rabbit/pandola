var fs = require('fs')

function normalizeIconData(data) {
    var out = []

    for (var key in data) {
		var tags = data[key].tags
		var icons = data[key].icons

		var arr = icons.map(function (n) {
			return Object.assign({}, n, {
				code: n.code.replace(/^0x(\w+)$/, '\\u$1'),
				name: 'ion-' + n.name,
				tags: tags,
				group: key
			})
		})

		out = out.concat(arr)
    }

    return out
}

function main(api) {
    api.get('/icon', function (req, res) {
		fs.readFile('./node_modules/ionicons/dist/data/ionicons.json', function (err, data) {
			if (err) return console.log(err)
			res.send(normalizeIconData(JSON.parse(data)))
		})
    })
}

module.exports = main
