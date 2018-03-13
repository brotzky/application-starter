import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import Loadable from 'react-loadable';

import render from './middleware/render';
import proxy from './middleware/proxy';
import { webpackDev, webpackHot } from './middleware/webpack';
import startup from './utils/startup';

const app = express();
const root = path.join(__dirname, '../../');

// Setting up webpack for development env
app.use(webpackDev);
app.use(webpackHot);

// Proxying API calls
app.use('/v1', proxy);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(compression());

app.use(favicon(path.join(root, 'static', 'favicon.ico')));
app.use(express.static(path.join(root, 'static')));

app.use(render);

Loadable.preloadAll().then(() => {
  app.listen(process.env.PORT, startup);
});
