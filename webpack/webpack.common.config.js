const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ReactLoadableWebpack = require('react-loadable/webpack');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');

// pretier-ignore
module.exports = () => ({
  context: src,
  cache: true,
  target: 'web',

  stats: {
    chunks: false,
  },

  entry: {
    client: ['isomorphic-fetch', path.join(src, 'client/index.js')],
    vendor: [
      'react',
      'react-dom',
      'moment',
      'numeral',
      'react-router-dom',
      'redux',
      'react-redux',
    ],
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.json'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ReactLoadableWebpack.ReactLoadablePlugin({
      filename: './static/dist/react-loadable.json',
    }),
  ],
});
