const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ReactLoadableWebpack = require('react-loadable/webpack');
const commonConfig = require('./webpack.common.config.js');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src');
const assetsPath = path.resolve(root, 'static/dist');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

// pretier-ignore
const prodConfig = () => ({
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: assetsPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },

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
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DLLS__: false,
    }),
    new ReactLoadableWebpack.ReactLoadablePlugin({
      filename: './static/dist/react-loadable.json',
    }),
  ],
});

module.exports = env => merge(commonConfig(env), prodConfig(env));
