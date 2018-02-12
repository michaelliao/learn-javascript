const logger = require('./logger.js');

logger.info('start app...');
try {
    throw new Error('APP ERROR!');
} catch (e) {
    logger.error('error', e);
}
logger.info('app ended.');
