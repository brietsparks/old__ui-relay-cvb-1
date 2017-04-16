var webpack = require('webpack');
var path = require('path');

var ROOT_DIR = path.resolve(__dirname);
var SRC_DIR = path.resolve(__dirname, 'app/src');
var BUILD_DIR = path.resolve(__dirname, 'app/public');

var config = {
  entry: [
    SRC_DIR + '/app.js',
    'babel-regenerator-runtime'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'app.client.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'transform-runtime',
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  devtool: 'inline-source-map'
};

module.exports = config;