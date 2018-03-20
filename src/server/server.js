import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import Loadable from 'react-loadable';
import helmet from 'helmet';
import url from 'url';

import https from './middleware/https';
import logger from './middleware/logger';
import proxy from './middleware/proxy';
import render from './middleware/render';
import security from './middleware/security';
import { webpackDev, webpackHot } from './middleware/webpack';
import startup from './utils/startup';

const root = path.join(__dirname, '../../');

const app = express();

// Security related
app.disable('x-powered-by');
app.use(helmet());
app.use(security());

// Proxying API calls
app.use('/v1', proxy());

// Force Https
app.use(https());
app.set('trust proxy', true);

// Setting up webpack for development env
app.use(webpackDev);
app.use(webpackHot);

// Utilities
app.use(morgan('dev'));
app.use(cookieParser());
app.use(compression());

// Serve static files
app.use(favicon(path.join(root, 'static', 'favicon.ico')));
app.use(express.static(path.join(root, 'static')));

// SSR our React app
app.use(render);

app.use(logger);

Loadable.preloadAll().then(() => {
  app.listen(process.env.PORT, startup);
});
