'use strict';

// read text from 'sample.txt'

const fs = require('fs');

console.log('>>> BEGIN >>>')

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

console.log('>>> END >>>')
