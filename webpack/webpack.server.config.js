const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
  mode: 'production',
  context: path.join(root, 'src'),

  entry: path.join(root, 'src/server/server.js'),

  output: {
    path: path.join(root, 'build'),
    filename: 'server.js',
    publicPath: '/',
  },

  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                targets: {
                  node: 8,
                },
              },
            ],
          ],
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
      },
      __CLIENT__: true,
      __PRODUCTION__: true,
      __DEVELOPMENT__: false,
    }),
  ],
  externals: nodeExternals(),
};
