module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-unused-expressions': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': ['error', 'always'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['initialize-database.js', 'tests/**/*.js']
    }],
  },
  globals: {
    before: true,
    beforeEach: true,
    after: true,
    afterEach: true,
    it: true,
    describe: true,
  },
};
