
//
// Bean Mock Restful API service
//
//	Arthur Lee, 2020-08-21
//

const _ = require('lodash')
const fsPromises = require('fs').promises
const koaBody = require('koa-body')

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

const Koa = require('koa')
const app = new Koa()

app.use(koaBody())

// parameters merge
app.use(async (ctx, next) => {
	console.log('------------------------- request -------------------')
	console.log(`${ctx.method} ${ctx.url}`);
	console.log('Content Type:', ctx.headers['content-type'])

	console.log('headers', ctx.headers)

	ctx.params = _.merge(ctx.query, ctx.request.body)
	console.log('params', ctx.params)

	ctx.jsonFile = `${rootFilesPath}/${_.replace(ctx.path, /\//g, '_')}_${ctx.method.toLowerCase()}`
	if (ctx.params.pseudo) {
		ctx.jsonFile += `_${ctx.params.pseudo}`
	}
	ctx.jsonFile += '.json';
	console.log(ctx.jsonFile)

	await next()
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
app.use(async ctx => {
	await sendJsonFile(ctx, ctx.jsonFile)
})

// start app
let port = 1492

if (argv.length > 1) {
	port = argv[1]
	console.log(`set port to ${port}`)
}

app.listen(port)
console.log(`pseudo service listening at http://127.0.0.1:${port}`)

// --------------------- supported functions -----------------------------

function sendJson(ctx, obj) {
	console.log('------------------------- response -------------------')
	console.log(JSON.stringify(obj, null, 2))	// well-formatted
	console.log('------------------------------------------------------')

	ctx.body = obj
}

async function sendJsonFile(ctx, filename) {
	const data = await fsPromises.readFile(filename)
	sendJson(ctx, JSON.parse(data))
}
