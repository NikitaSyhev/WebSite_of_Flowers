'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './public/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/scripts'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
