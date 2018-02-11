function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    console.log('Hello, ' + this.name + '!');
};

'use strict';

function Cat(name) {
    this.name=name;
}

Cat.prototype.say = function (){
    console.log("Hello, "+this.name+"!");
}


// 测试:
var kitty = new Cat('Kitty');
var doraemon = new Cat('哆啦A梦');
kitty.say();
if (kitty && kitty.name === 'Kitty' && kitty.say && typeof kitty.say === 'function' && kitty.say() === 'Hello, Kitty!' || kitty.say === doraemon.say) {
    console.log('测试通过!');
} else {
    console.log('测试失败!');
}