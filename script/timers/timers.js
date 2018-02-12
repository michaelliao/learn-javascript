'use strict';

console.log('Now: ' + new Date().toTimeString());

setTimeout(function () {
    console.log('Run at ' + new Date().toTimeString());
}, 1500);

setInterval(function () {
    console.log('Schedule at ' + new Date().toTimeString());
}, 3000);

console.log('timer setted.');
