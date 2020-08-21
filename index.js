
//
// Bean Mock Restful API service
//
//	Arthur Lee, 2020-08-21
//

const _ = require('lodash')
const fs = require('fs')


// mock api data root file path
let rootFilesPath = 'files'

const argv = process.argv.slice(2)
if (argv.length > 0) {
	if (fs.existsSync(argv[0])) {
		rootFilesPath = argv[0]
	} else {
		console.error(`path ${argv[0]} not exists`)
		return
	}
}

console.log(`rootFilesPath set to ${rootFilesPath}`)

// APP

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parameters merge
app.use((req, res, next) => {
	console.log('------------------------- request -------------------')
	console.log(`${req.method} ${req.url}`);
	console.log('Content Type:', req.headers['content-type'])

	console.log('headers', req.headers)

	req.params = _.merge(req.query, req.body)
	console.log('params', req.params)

	req.jsonFile = `${rootFilesPath}/${_.replace(req._parsedUrl.pathname, /\//g, '_')}_${req.method.toLowerCase()}`
	if (req.params.pseudo) {
		req.jsonFile += `_${req.params.pseudo}`
	}
	req.jsonFile += '.json';
	console.log(req.jsonFile)

	next()
})

//
// request different cases
// add pseudo parameter in the end of the url, stand for different cases
// For example:
//		POST http://127.0.0.1:1492/api/getefg   => files\_api_getefg_post.json
//		POST http://127.0.0.1:1492/api/getefg?pseudo=1   => files\_api_getefg_post_1.json
//
//	curl command line：
//		curl -d "a=b" "http://127.0.0.1:1492/api/getList"
//
app.use((req, res) => {
	sendJsonFile(res, req.jsonFile)
})

// start app
let port = 1492

if (argv.length > 1) {
	port = argv[1]
	console.log(`set port to ${port}`)
}

app.listen(port, () => {
	console.log(`pseudo service listening at http://127.0.0.1:${port}`)
})

// --------------------- supported functions -----------------------------

function sendJson(res, obj) {
	console.log('------------------------- response -------------------')
	console.log(JSON.stringify(obj, null, 2))	// well-formatted
	console.log('------------------------------------------------------')

	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.end(JSON.stringify(obj))	// compact
}

function sendJsonFile(res, filename) {
	fs.readFile(filename, (err, data) => {
		if (err) {
			sendJson(res, {code: '-1', message: err.message})
			return
		}

		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(data)
	})
}
