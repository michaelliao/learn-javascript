'use strict';

// read text from 'sample.txt'

const fs = require('fs');

console.log('>>> BEGIN >>>')

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);

console.log('>>> END >>>')
