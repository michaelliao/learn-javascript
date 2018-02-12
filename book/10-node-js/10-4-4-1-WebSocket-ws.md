要使用WebSocket，关键在于服务器端支持，这样，我们才有可能用支持WebSocket的浏览器使用WebSocket。

## ws模块

在Node.js中，使用最广泛的WebSocket模块是ws，我们创建一个hello-ws的VS Code工程，然后在package.json中添加ws的依赖：
```
"dependencies": {
    "ws": "1.1.1"
}
```
整个工程结构如下：

```
hello-ws/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- app.js <-- 启动js文件
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

运行npm install后，我们就可以在app.js中编写WebSocket的服务器端代码。

创建一个WebSocket的服务器实例非常容易：

```
// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});
```

这样，我们就在3000端口上打开了一个WebSocket Server，该实例由变量wss引用。

接下来，如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket：

```
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
        
    })
});
```

在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接。对于每个WebSocket连接，我们都要对它绑定某些事件方法来处理不同的事件。
这里，我们通过响应message事件，在收到消息后再返回一个ECHO: xxx的消息给客户端。

## 创建WebSocket连接

现在，这个简单的 服务器端WebSocket程序 就编写好了。如何真正创建WebSocket并且给服务器发消息呢？方法是在浏览器中写JavaScript代码。

先在VS Code中执行app.js，或者在命令行用npm start执行。然后，在当前页面下，直接打开可以执行JavaScript代码的浏览器Console，依次输入代码：
```
// 打开一个WebSocket:
var ws = new WebSocket('ws://localhost:3000/test');
// 响应onmessage事件:
ws.onmessage = function(msg) { console.log(msg); };
// 给服务器发送一个字符串:
ws.send('Hello!');
```
一切正常的话，可以看到Console的输出如下：

MessageEvent {isTrusted: true, data: "ECHO: Hello!", origin: "ws://localhost:3000", lastEventId: "", source: null…}

这样，我们就在浏览器中成功地收到了服务器发送的消息！

如果嫌在浏览器中输入JavaScript代码比较麻烦，我们还可以直接用ws模块提供的WebSocket来充当客户端。换句话说，ws模块既包含了服务器端，又包含了客户端。

ws的WebSocket就表示客户端，它其实就是WebSocketServer响应connection事件时回调函数传入的变量ws的类型。

客户端的写法如下：
```
let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
}
```

在Node环境下，ws模块的客户端可以用于测试服务器端代码，否则，每次都必须在浏览器执行JavaScript代码。

## 同源策略

从上面的测试可以看出，WebSocket协议本身不要求同源策略（Same-origin Policy），也就是某个地址为http://a.com的网页可以通过WebSocket连接到ws://b.com。

但是，浏览器会发送Origin的HTTP头给服务器，服务器可以根据Origin拒绝这个WebSocket请求。所以，是否要求同源要看服务器端如何检查。

## 路由

还需要注意到服务器在响应connection事件时并未检查请求的路径，因此，在客户端打开ws://localhost:3000/any/path可以写任意的路径。

实际应用中还需要根据不同的路径实现不同的功能。

参考源码
hello-ws