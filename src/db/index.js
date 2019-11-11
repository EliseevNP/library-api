const Promise = require('bluebird');
const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.db);

Promise.promisifyAll(pool);

module.exports = pool;
