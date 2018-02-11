## ES6标准新增了一种新的函数：Arrow Function（箭头函数）。

为什么叫Arrow Function？因为它的定义用的就是一个箭头：
```
x => x * x
上面的箭头函数相当于：

function (x) {
    return x * x;
}
```

在继续学习箭头函数之前，请测试你的浏览器是否支持ES6的Arrow Function：

```
'use strict';
var fn = x => x * x;
console.log('你的浏览器支持ES6的Arrow Function!');
```

箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了。还有一种可以包含多条语句，这时候就不能省略{ ... }和return：
```
x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
}
```
如果参数不是一个，就需要用括号()括起来：

// 两个参数:
(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
```
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
```
如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错：
```
// SyntaxError:
x => { foo: x }
```

因为和函数体的{ ... }有语法冲突，所以要改为：
```
// ok:
x => ({ foo: x })
```
## this

箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。

回顾前面的例子，由于JavaScript函数对this绑定的错误处理，下面的例子无法得到预期结果：
```
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
```
- 现在，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj：
```
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
```
- 如果使用箭头函数，以前的那种hack写法：
var that = this;
就不再需要了。

- 由于this在箭头函数中已经按照词法作用域绑定了
，所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：
```
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
obj.getAge(2015); // 25
```

- 练习

请使用箭头函数简化排序时传入的函数：

'use strict'
var arr = [10, 20, 1, 2];

arr.sort((x, y) => {
     if (x < y) {
            return 1;
        }
        if (x > y) {
            return -1;
        }
        return 0;
});
console.log(arr); // [1, 2, 10, 20]

