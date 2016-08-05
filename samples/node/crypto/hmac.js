const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

var r = hmac.digest('hex');
console.log('hmac: ' + r); // 80f7e22570bed1fa3ef683edce5d0890e268e1ca8d1bd0c382bc766f3744be9f
