'use strict';

// write text to 'output.txt'

const fs = require('fs');

console.log('>>> BEGIN >>>')

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

console.log('>>> END >>>')
