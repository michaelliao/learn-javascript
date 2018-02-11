const winston = require('winston');

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            name: 'console',
            colorize: true,
            level: 'info',
            timestamp: true
        }),
        new winston.transports.File({
            name: 'info-file',
            filename: __dirname + '/info.log',
            level: 'info',
        }),
        new winston.transports.File({
            name: 'error-file',
            filename: __dirname + '/error.log',
            level: 'error',
            json: false,
            timestamp: function () {
                return new Date().toTimeString();
            }
        })
    ]
});

module.exports = logger;
