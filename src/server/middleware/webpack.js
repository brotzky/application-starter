import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../../webpack/webpack.development.config';

const isDev = process.env.NODE_ENV === 'development';
const webpackConfig = config();
const compiler = webpack(webpackConfig);
const devServerConfig = {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: 'errors-only',
};

const byPass = (req, res, next) => next();

// Only running webpack middlware in dev
export const webpackDev = isDev
  ? webpackDevMiddleware(compiler, devServerConfig)
  : byPass;

export const webpackHot = isDev ? webpackHotMiddleware(compiler) : byPass;
