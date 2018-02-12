// global objects in nodejs:

// current JavaScript file:
console.log('current js file: ' + __filename);

// current JavaScript file dir:
console.log('current js dir: ' + __dirname);

process.name = 'Sample Nodejs';

// process.argv 存储了命令行参数:
console.log('arguments: ' + JSON.stringify(process.argv));

// process.cwd() 返回当前工作目录:
console.log('cwd: ' + process.cwd());

// 切换当前工作目录:
var d = '/private/tmp';
if (process.platform === 'win32') {
    // 如果是Windows，切换到 C:\Windows\System32
    d = 'C:\\Windows\\System32';
}
process.chdir(d);
console.log('cwd: ' + process.cwd());

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');
});
console.log('nextTick was set!');

// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});
