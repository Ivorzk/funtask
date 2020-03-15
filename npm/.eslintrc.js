module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 统一函数定义
    'func-style': [2, 'expression'],
    // 函数括号前面是否加上两个空格
    'space-before-function-paren': [0, 'always'],
    // 末尾是否加上分号 never/always
    'semi': [2, 'never'],
    // 分号前后是否加空格
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)'
    ],
    env: {
      mocha: true
    }
  }]
}
