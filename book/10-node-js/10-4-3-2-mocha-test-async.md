
用mocha测试一个函数是非常简单的，但是，在JavaScript的世界中，更多的时候，我们编写的是异步代码，所以，我们需要用mocha测试异步函数。

我们把上一节的hello-test工程复制一份，重命名为async-test，然后，把hello.js改造为异步函数：
```
const fs = require('mz/fs');

// a simple async function:
module.exports = async () => {
    let expression = await fs.readFile('./data.txt', 'utf-8');
    let fn = new Function('return ' + expression);
    let r = fn();
    console.log(`Calculate: ${expression} = ${r}`);
    return r;
};
```

这个async函数通过读取data.txt的内容获取表达式，这样它就变成了异步。我们编写一个data.txt文件，内容如下：
```
1 + (2 + 4) * (9 - 2) / 3
```
别忘了在package.json中添加依赖包：

```
"dependencies": {
    "mz": "2.4.0"
},
```

紧接着，我们在test目录中添加一个await-test.js，测试hello.js的async函数。

我们先看看mocha如何实现异步测试。

- 测试同步函数，我们传入无参数函数即可：
```
it('test sync function', function () {
    // TODO:
    assert(true);
});
```
- 测试异步函数，我们要传入的函数需要带一个参数，通常命名为done：
```
it('test async function', function (done) {
    fs.readFile('filepath', function (err, data) {
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});
```
测试异步函数需要在函数内部手动调用done()表示测试成功，done(err)表示测试出错。

对于用ES7的async编写的函数，我们可以这么写：
```
it('#async with done', (done) => {
    (async function () {
        try {
            let r = await hello();
            assert.strictEqual(r, 15);
            done();
        } catch (err) {
            done(err);
        }
    })();
});
```
但是用try...catch太麻烦。还有一种更简单的写法，就是直接把async函数当成同步函数来测试：

```
it('#async function', async () => {
    let r = await hello();
    assert.strictEqual(r, 15);
});
```
这么写异步测试，太简单了有木有！

我们把上一个hello-test工程复制为async-test，结构如下：
```
async-test/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- hello.js <-- 待测试js文件
|
+- data.txt <-- 数据文件
|
+- test/ <-- 存放所有test
｜ ｜
|  +- await-test.js <-- 异步测试
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```
现在，在命令行窗口运行命令node node_modules\mocha\bin\mocha，测试就可以正常执行：

  #async hello
    #asyncCalculate()
Calculate: 1 + (2 + 4) * (9 - 2) / 3 = 15
      ✓ #async function
  1 passing (11ms)
第二种方法是在package.json中把script改为：

"scripts": {
    "test": "mocha"
}
这样就可以在命令行窗口通过npm test执行测试。

第三种方法是在VS Code配置文件中把program改为：

"program": "${workspaceRoot}/node_modules/mocha/bin/mocha"
这样就可以在VS Code中直接运行测试。

- 编写异步代码时，我们要坚持使用async和await关键字，这样，编写测试也同样简单。