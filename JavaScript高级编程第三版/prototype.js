var animal = function(){};
var dog = function(){};

animal.price = 2000;//
dog.prototype = animal;
var tidy = new dog();


console.log(dog.price) //为什么输出 undefined 
console.log(tidy.price) //为什么输出 2000

// 作者：吴健
// 链接：https://www.zhihu.com/question/34158992/answer/88618830
// 来源：知乎
// 著作权归作者所有，转载请联系作者获得授权。