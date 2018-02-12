用mocha测试一个async函数是非常方便的。现在，当我们有了一个koa的Web应用程序时，我们怎么用mocha来自动化测试Web应用程序呢？

一个简单的想法就是在测试前启动koa的app，然后运行async测试，在测试代码中发送http请求，收到响应后检查结果，这样，一个基于http接口的测试就可以自动运行。

我们先创建一个最简单的koa应用，结构如下：
```
koa-test/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- app.js <-- koa app文件
|
+- start.js <-- app启动入口
|
+- test/ <-- 存放所有test
｜ ｜
|  +- app-test.js <-- 异步测试
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

这个koa应用和前面的koa应用稍有不同的是，app.js只负责创建app实例，并不监听端口：
```
// app.js

const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    var name = ctx.request.query.name || 'world';
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

module.exports = app;
```

而start.js负责真正启动应用：

```
// start.js

const app = require('./app');

app.listen(3000);
console.log('app started at port 3000...');
```

这样做的目的是便于后面的测试。

紧接着，我们在test目录下创建app-test.js，来测试这个koa应用。

在测试前，我们在package.json中添加devDependencies，除了mocha外，我们还需要一个简单而强大的测试模块supertest：

```
{
    ...
    "devDependencies": {
        "mocha": "3.0.2",
        "supertest": "3.0.0"
    }
}
```

运行npm install后，我们开始编写测试：
```
// app-test.js

const
    request = require('supertest'),
    app = require('../app');

describe('#test koa app', () => {

    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /path?name=Bob', async () => {
            let res = await request(server)
                .get('/path?name=Bob')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Bob!</h1>');
        });
    });
});

```
在测试中，我们首先导入supertest模块，然后导入app模块，注意我们已经在app.js中移除了app.listen(3000);语句，所以，这里我们用：
```
let server = app.listen(9900);
```
让app实例监听在9900端口上，并且获得返回的server实例。

在测试代码中，我们使用：

```
let res = await request(server).get('/');
```

就可以构造一个GET请求，发送给koa的应用，然后获得响应。

可以手动检查响应对象，例如，res.body，还可以利用supertest提供的expect()更方便地断言响应的HTTP代码、返回内容和HTTP头。

断言HTTP头时可用使用正则表达式。例如，下面的断言：

```
.expect('Content-Type', /text\/html/)
```

可用成功匹配到Content-Type为text/html、text/html; charset=utf-8等值。

当所有测试运行结束后，app实例会自动关闭，无需清理。

利用mocha的异步测试，配合supertest，我们可以用简单的代码编写端到端的HTTP自动化测试。

参考源码
koa-test