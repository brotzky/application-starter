const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src');
const assetsPath = path.resolve(root, 'static/dist');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

const babelQuery = {
  env: {
    development: {
      presets: ['react-hmre'],
      plugins: [
        [
          'react-transform',
          {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              },
            ],
          },
        ],
      ],
    },
  },
};

// pretier-ignore
const devConfig = () => ({
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  entry: {
    client: ['webpack-hot-middleware/client', 'babel-polyfill'],
  },

  output: {
    path: assetsPath,
    filename: '[name].[hash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: babelQuery,
      },
    ],
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        PORT: 3000,
      },
      __CLIENT__: true,
      __PRODUCTION__: false,
      __SERVER__: false,
      __DEVELOPMENT__: true,
    }),
  ],
});

module.exports = env => merge(commonConfig(env), devConfig(env));
