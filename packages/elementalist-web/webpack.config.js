const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [path.resolve('src/app/index.js')],

  output: {
    publicPath: '/_elem',
    path: path.resolve('public'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/app/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
