const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const ReactLoadableWebpack = require('react-loadable/webpack');

const gitRevisionPlugin = new GitRevisionPlugin();
const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src');
const dist = path.resolve(root, 'dist');

// pretier-ignore
module.exports = () => ({
  context: src,
  cache: true,
  target: 'web',

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

  output: {
    path: dist,
    filename: '[name].[hash].js',
    publicPath: '/dist/',
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
      filename: './dist/react-loadable.json',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        GIT: {
          VERSION: JSON.stringify(gitRevisionPlugin.version()),
          COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
        },
      },
    }),
  ],
});
