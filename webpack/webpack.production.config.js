const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// pretier-ignore
const prodConfig = () => ({
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },

  // optimization: {
  //   minimizer: [
  //     new UglifyJSPlugin({
  //       uglifyOptions: {
  //         beautify: false,
  //         compress: true,
  //         comments: false,
  //         mangle: false,
  //         toplevel: false,
  //       },
  //     }),
  //   ],
  // },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __CLIENT__: true,
      __PRODUCTION__: true,
      __DEVELOPMENT__: false,
    }),
  ],
});

module.exports = env => merge(commonConfig(env), prodConfig(env));
