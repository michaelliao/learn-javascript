"use strict";
// var person =new Object();
// person.name = "Nicholas";
// person.age = 29;
// person.job = "Software Engineer";

// person.sayName = function () {
// 	console.log(this.name);
// };
// //设置name只读属性
// Object.defineProperty(person, "name", {
// 	writable: false,
// 	value: "Nicholas"
// });
// console.log(person.name);
// person.name = "MiG";
// console.log(person.name);

var person ={};
//设置name不可删除
Object.defineProperty(person, "name", {
	configurable: false,
	value: "Nicholas"
});
console.log(person.name);
delete person.name;
console.log(person.name);
