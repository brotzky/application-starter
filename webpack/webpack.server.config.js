const nodeExternals = require('webpack-node-externals');
const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
  mode: 'production',
  context: path.join(root, 'src'),

  entry: path.join(root, 'src/server/server.js'),

  output: {
    path: path.join(root, 'dist'),
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
  externals: nodeExternals(),
};
