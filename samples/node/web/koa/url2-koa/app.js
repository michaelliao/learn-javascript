const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();

const fs = require('fs');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    }, files);

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        const mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addControllers(router);

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
