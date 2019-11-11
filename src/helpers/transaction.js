const Promise = require('bluebird');
const db = require('../db');

/**
 * Perform all sql queries inside given callback as a transaction.
 * If callback throw an error, transaction changes will be rollbacked.
 * If callback return some result, transaction changes will be commited.
 */
module.exports = async callback => {
  const connection = await db.getConnectionAsync();

  try {
    Promise.promisifyAll(connection);
    await connection.beginTransactionAsync();

    try {
      const result = await callback(connection);

      await connection.commitAsync();
      connection.release();

      return result;
    } catch (err) {
      await connection.rollbackAsync();
      throw err;
    }
  } catch (err) {
    connection.release();
    throw err;
  }
};
