module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': ['error', 'always'],
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
