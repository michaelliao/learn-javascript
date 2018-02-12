假设我们编写了一个hello.js，并且输出一个简单的求和函数：

```
// hello.js

module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};
```

这个函数非常简单，就是对输入的任意参数求和并返回结果。

如果我们想对这个函数进行测试，可以写一个test.js，然后使用Node.js提供的assert模块进行断言：
```
// test.js

const assert = require('assert');
const sum = require('./hello');

assert.strictEqual(sum(), 0);
assert.strictEqual(sum(1), 1);
assert.strictEqual(sum(1, 2), 3);
assert.strictEqual(sum(1, 2, 3), 6);
```

assert模块非常简单，它断言一个表达式为true。如果断言失败，就抛出Error。可以在Node.js文档中查看assert模块的所有API。

- 单独写一个test.js的缺点是没法自动运行测试，而且，如果第一个assert报错，后面的测试也执行不了了。

如果有很多测试需要运行，就必须把这些测试全部组织起来，然后统一执行，并且得到执行结果。这就是我们为什么要用mocha来编写并运行测试。

## mocha test

我们创建hello-test工程来编写hello.js以及相关测试。工程结构如下：
```
hello-test/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- hello.js <-- 待测试js文件
|
+- test/ <-- 存放所有test
｜ ｜
|  +- hello-test.js <-- 测试文件
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

我们首先在package.json中添加mocha的依赖包。和其他依赖包不同，这次我们并没有把依赖包添加到 "dependencies"中，而是"devDependencies"：
```
{
  ...

  "dependencies": {},
  "devDependencies": {
    "mocha": "3.0.2"
  }
}
```

- 如果一个模块在运行的时候并不需要，仅仅在开发时才需要，就可以放到devDependencies中。这样，正式打包发布时，devDependencies的包不会被包含进来。

然后使用npm install安装。

注意，很多文章会让你用命令npm install -g mocha把mocha安装到全局module中。这是不需要的。尽量不要安装全局模块，因为全局模块会影响到所有Node.js的工程。

紧接着，我们在test目录下创建hello-test.js来编写测试。

- mocha默认会执行test目录下的所有测试，不要去改变默认目录。

hello-test.js内容如下：
```
const assert = require('assert');

const sum = require('../hello');

describe('#hello.js', () => {

    describe('#sum()', () => {
        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });

        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });

        it('sum(1, 2) should return 3', () => {
            assert.strictEqual(sum(1, 2), 3);
        });

        it('sum(1, 2, 3) should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    });
});
```

- 这里我们使用mocha默认的BDD-style的测试。describe可以任意嵌套，以便把相关测试看成一组测试。

- 每个it("name", function() {...})就代表一个测试。例如，为了测试sum(1, 2)，我们这样写：
```
it('sum(1, 2) should return 3', () => {
    assert.strictEqual(sum(1, 2), 3);
});
```
编写测试的原则是，一次只测一种情况，且测试代码要非常简单。我们编写多个测试来分别测试不同的输入，并使用assert判断输出是否是我们所期望的。

## 运行测试

下一步，我们就可以用mocha运行测试了。

如何运行？有三种方法。

方法一，可以打开命令提示符，切换到hello-test目录，然后执行命令：

C:\...\hello-test>node  node_modules\mocha\bin\mocha
mocha就会自动执行所有测试，然后输出如下：
```
  #hello.js
    #sum()
      ✓ sum() should return 0
      ✓ sum(1) should return 1
      ✓ sum(1, 2) should return 3
      ✓ sum(1, 2, 3) should return 6
  4 passing (7ms)
  ```
这说明我们编写的4个测试全部通过。如果没有通过，要么修改测试代码，要么修改hello.js，直到测试全部通过为止。

方法二，我们在package.json中添加npm命令：
```
{
  ...

  "scripts": {
    "test": "mocha"
  },

  ...
}
```
然后在hello-test目录下执行命令：

C:\...\hello-test> npm test
可以得到和上面一样的输出。这种方式通过npm执行命令，输入的命令比较简单。

方法三，我们在VS Code中创建配置文件.vscode/launch.json，然后编写两个配置选项：
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/hello.js",
            "stopOnEntry": false,
            "args": [],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": null,
            "runtimeExecutable": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "development"
            },
            "externalConsole": false,
            "sourceMaps": false,
            "outDir": null
        },
        {
            "name": "Test",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/mocha/bin/mocha",
            "stopOnEntry": false,
            "args": [],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": null,
            "runtimeExecutable": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "test"
            },
            "externalConsole": false,
            "sourceMaps": false,
            "outDir": null
        }
    ]
}
```
注意第一个配置选项Run是正常执行一个.js文件，第二个配置选项Test我们填入"program": "${workspaceRoot}/node_modules/mocha/bin/mocha"，
并设置env为"NODE_ENV": "test"，这样，就可以在VS Code中打开Debug面板，选择Test，运行，即可在Console面板中看到测试结果：

## before和after

在测试前初始化资源，测试后释放资源是非常常见的。

mocha提供了before、after、beforeEach和afterEach来实现这些功能。

我们把hello-test.js改为：

```
const assert = require('assert');
const sum = require('../hello');

describe('#hello.js', () => {
    describe('#sum()', () => {
        before(function () {
            console.log('before:');
        });

        after(function () {
            console.log('after.');
        });

        beforeEach(function () {
            console.log('  beforeEach:');
        });

        afterEach(function () {
            console.log('  afterEach.');
        });

        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });

        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });

        it('sum(1, 2) should return 3', () => {
            assert.strictEqual(sum(1, 2), 3);
        });

        it('sum(1, 2, 3) should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    });
});
```

再次运行，可以看到每个test执行前后会分别执行beforeEach()和afterEach()，以及一组test执行前后会分别执行before()和after()：
```
  #hello.js
    #sum()
before:
  beforeEach:
      ✓ sum() should return 0
  afterEach.
  beforeEach:
      ✓ sum(1) should return 1
  afterEach.
  beforeEach:
      ✓ sum(1, 2) should return 3
  afterEach.
  beforeEach:
      ✓ sum(1, 2, 3) should return 6
  afterEach.
after.
  4 passing (8ms)
  ```
参考源码
hello-test