'use strict';

// read from 'sample.png'

const fs = require('fs');

console.log('>>> BEGIN >>>')

var data = fs.readFileSync('sample.png');
console.log(data);
console.log(data.length + ' bytes');

console.log('>>> END >>>')
