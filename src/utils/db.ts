import { Pool } from 'pg';
import config = require('./../config');
import logger = require('./../utils/logger');

const pool = new Pool({
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis
});

pool.on('error', function (err:Error) {
    logger.error(`idle client error, ${err.message} | ${err.stack}`);
});

module.exports = pool;