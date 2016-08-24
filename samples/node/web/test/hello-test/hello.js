// hello.js
console.log('init hello.js...');

// a simple function:
// > sum(1, 2, 3)
// 6
module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};
