const { WHERE_OPERATORS } = require('../constants');

module.exports = (tableName, whereObject) => {
  const buildWhereSQLRecursive = currentWhereObject => {
    const key = Object.keys(currentWhereObject)[0];

    if (WHERE_OPERATORS.LOGICALS.includes(key)) {
      const whereExpressions = currentWhereObject[key].map(item => {
        return buildWhereSQLRecursive(item);
      });

      return `(${whereExpressions.join(` ${key} `)})`;
    }

    return `${tableName}.${key} ${currentWhereObject[key].operator} '${currentWhereObject[key].value.replace(/'/g, '\\\'')}'`;
  };

  return `WHERE ${buildWhereSQLRecursive(whereObject)}`;
};
