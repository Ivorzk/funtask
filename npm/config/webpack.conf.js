const path = require('path')
module.exports = {
  entry: ['./core/index.js'],
  output: {
    path: path.join(__dirname, './../dist'),
    filename: 'index.js'
  },
  node: {
    fs: 'empty'
  },
  mode: 'production'
}
