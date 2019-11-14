const Promise = require('bluebird');

/**
 * This helper executes all SQL queries within a given callback as a transaction.
 * If the callback throw an error, transaction changes will be rollbacked.
 * If the callback return some result, transaction changes will be commited.
 */
module.exports = async (pool, callback) => {
  const connection = await pool.getConnectionAsync();

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
