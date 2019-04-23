'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.js'),
    board: path.join(__dirname, 'src/board/board.js'),
    playground: path.join(__dirname, 'src/playground/playground.js'),
  },
  output: {
    path: path.join(__dirname, '/app/'),
    publicPath: '/app/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
