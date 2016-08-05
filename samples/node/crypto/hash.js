const crypto = require('crypto');

const hash = crypto.createHash('md5');

hash.update('Hello, world!');
hash.update('Hello, nodejs!');

var r = hash.digest('hex');
console.log(`md5 hash: ${r}`); // 7e1977739c748beac0c0fd14fd26a544
