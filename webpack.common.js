/**
 * webpack.common.js
 *
 */

const path = require('path')
const SRC_DIR = path.join(__dirname, './src')
const DIST_DIR = path.join(__dirname, './public/')
const webpack = require('webpack')

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
