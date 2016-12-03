function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() {
		console.log(this.name);
	};
}

var person1 = new Person("Nicholas", 29, "SE");
var person2 = new Person("Gery", 27, "Doctor");

console.log(person1);
person1.sayName();
//person1 and person2 are constructor function.
console.log(person1.constructor === Person);
//and there are Object 的实例。
console.log(person1 instanceof Object);
console.log(person1 instanceof Person);
console.log(person2);