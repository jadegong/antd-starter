/*
 * @Descripttion:
 * @version:
 * @Author: ljx
 * @Date: 2020-12-03 09:57:27
 * @LastEditors: ljx
 * @LastEditTime: 2021-02-24 16:45:15
 * v1.5.0 2021/04/08 gqd
 *      1.Allow use of any type.
 */
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'no-useless-catch': 'off',
    'no-shadow': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-eval': 'off',
    'no-nested-ternary': 'off',
    'no-useless-constructor': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'no-console': 'off',
    'react/no-array-index-key': 0,
    'react/no-access-state-in-setstate': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
