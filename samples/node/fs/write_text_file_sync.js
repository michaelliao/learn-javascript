'use strict';

// write text to 'output.txt'

var fs = require('fs');

console.log('>>> BEGIN >>>')

var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);

console.log('>>> END >>>')
