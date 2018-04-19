const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '..');
const buildApi = path.resolve(root, 'build-api');

module.exports = {
  name: 'api',
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: '../build-api/*.js',
  },
  entry: path.resolve(root, 'bin/api'),
  devtool: 'eval-source-map',
  target: 'node',
  output: {
    path: buildApi,
    filename: '[name].js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `require("source-map-support").install();`,
      raw: true,
      entryOnly: false,
    }),
  ],
};
