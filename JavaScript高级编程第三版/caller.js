function outer() {
	inner();
}
function inner() {
	console.log(arguments.callee.caller);
}
outer();