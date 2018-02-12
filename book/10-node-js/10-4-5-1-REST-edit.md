
## REST API规范
编写REST API，实际上就是编写处理HTTP请求的async函数，不过，REST请求和普通的HTTP请求有几个特殊的地方：

- REST请求仍然是标准的HTTP请求，但是，除了GET请求外，POST、PUT等请求的body是JSON数据格式，请求的Content-Type为application/json；

- REST响应返回的结果是JSON数据格式，因此，响应的Content-Type也是application/json。

REST规范定义了资源的通用访问格式，虽然它不是一个强制要求，但遵守该规范可以让人易于理解。

例如，商品Product就是一种资源。获取所有Product的URL如下：
```
GET /api/products
```
而获取某个指定的Product，例如，id为123的Product，其URL如下：
```
GET /api/products/123
```
新建一个Product使用POST请求，JSON数据包含在body中，URL如下：
```
POST /api/products
```
更新一个Product使用PUT请求，例如，更新id为123的Product，其URL如下：
```
PUT /api/products/123
```
删除一个Product使用DELETE请求，例如，删除id为123的Product，其URL如下：
```
DELETE /api/products/123
```
资源还可以按层次组织。例如，获取某个Product的所有评论，使用：
```
GET /api/products/123/reviews
```
当我们只需要获取部分数据时，可通过参数限制返回的结果集，例如，返回第2页评论，每页10项，按时间排序：
```
GET /api/products/123/reviews?page=2&size=10&sort=time
```

## koa处理REST

既然我们已经使用koa作为Web框架处理HTTP请求，因此，我们仍然可以在koa中响应并处理REST请求。

我们先创建一个rest-hello的工程，结构如下：
```
rest-hello/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- controllers/
|  |
|  +- api.js <-- REST API
|
+- app.js <-- 使用koa的js
|
+- controller.js <-- 扫描注册Controller
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```
在package.json中，我们需要如下依赖包：
```
"dependencies": {
    "koa": "2.0.0",
    "koa-bodyparser": "3.2.0",
    "koa-router": "7.0.0"
}
```
运行npm install安装依赖包。

在app.js中，我们仍然使用标准的koa组件，并自动扫描加载controllers目录下的所有js文件：
```
const app = new Koa();

const controller = require('./controller');

// parse request body:
app.use(bodyParser());

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
```

注意到app.use(bodyParser());这个语句，它给koa安装了一个解析HTTP请求body的处理函数。如果HTTP请求是JSON数据，我们就可以通过ctx.request.body直接访问解析后的JavaScript对象。

下面我们编写api.js，添加一个GET请求：
```
// 存储Product列表，相当于模拟数据库:
var products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];

module.exports = {
    'GET /api/products': async (ctx, next) => {
        // 设置Content-Type:
        ctx.response.type = 'application/json';
        // 设置Response Body:
        ctx.response.body = {
            products: products
        };
    }
}
```

在koa中，我们只需要给ctx.response.body赋值一个JavaScript对象，koa会自动把该对象序列化为JSON并输出到客户端。

我们在浏览器中访问http://localhost:3000/api/products，可以得到如下输出：
```
{"products":[{"name":"iPhone","price":6999},{"name":"Kindle","price":999}]}
```

紧接着，我们再添加一个创建Product的API：
```
module.exports = {
    'GET /api/products': async (ctx, next) => {
        ...
    },

    'POST /api/products': async (ctx, next) => {
        var p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
};
```

这个POST请求无法在浏览器中直接测试。但是我们可以通过curl命令在命令提示符窗口测试这个API。我们输入如下命令：
```
curl -H 'Content-Type: application/json' -X POST -d '{"name":"XBox","price":3999}' http://localhost:3000/api/products
```
得到的返回内容如下：
```
{"name":"XBox","price":3999}
```
我们再在浏览器中访问http://localhost:3000/api/products，可以得到更新后的输出如下：
```
{"products":[{"name":"iPhone","price":6999},{"name":"Kindle","price":999},{"name":"XBox","price":3999}]}
```
可见，在koa中处理REST请求是非常简单的。bodyParser()这个middleware可以解析请求的JSON数据并绑定到ctx.request.body上，

输出JSON时我们先指定ctx.response.type = 'application/json'，然后把JavaScript对象赋值给ctx.response.body就完成了REST请求的处理。

参考源码

rest-hello