// in src/server/index.js
import express from 'express';
import Loadable from 'react-loadable';

import render from './middleware/render';
import proxy from './middleware/proxy';
import { webpackDev, webpackHot } from './middleware/webpack';

const app = express();

// Proxying API calls
app.use('/v1', proxy);

// Setting up webpack for development env
app.use(webpackDev);
app.use(webpackHot);

app.use('/dist', express.static('./dist'));
app.use('/static', express.static('./src/client/static'));

app.use(render);

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
});
