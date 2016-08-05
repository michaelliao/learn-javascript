'use strict';

const os = require('os');

console.log('CPU: ' + JSON.stringify(os.cpus()));

console.log('Network: ' + JSON.stringify(os.networkInterfaces()));

console.log('Total memory: ' + os.totalmem());

console.log('Free memory: ' + os.freemem());

console.log('Hostname: ' + os.hostname());

console.log('Platform: ' + os.platform());

console.log('Temp dir: ' + os.tmpdir());

console.log('OS type: ' + os.type());

console.log('Uptime: ' + os.uptime());
