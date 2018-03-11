import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';
import { parse as parseUrl } from 'url';

import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { theme } from '../../universal/themes';
import { globalStyles } from '../../universal/app/App';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import { trigger } from 'redial';
import asyncMatchRoutes from '../utils/asyncMatchRoutes';
import configureStore from '../../universal/redux/store';
import createMemoryHistory from 'history/createMemoryHistory';

import getScripts from '../utils/getScripts';
import asyncGetStats from '../utils/asyncGetStats';
import Html from '../html/Html';
import routes from '../../universal/routes';

import ReduxAsyncConnect from '../html/ReduxAsyncConnect';

const render = async (req, res) => {
  const url = req.originalUrl || req.url;
  const location = parseUrl(url);
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });
  const store = configureStore(history);

  const providers = {
    // client: apiClient(req),
    // app: createApp(req),
    // restApp: createApp(req)
  };

  store.dispatch(push(url));
  globalStyles();

  try {
    const { components, match, params } = await asyncMatchRoutes(
      routes,
      req.originalUrl,
    );

    await trigger('fetch', components, {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location,
    });

    const sheet = new ServerStyleSheet();
    const modules = [];
    const context = {};

    // prettier-ignore
    const html = renderToString(
      sheet.collectStyles(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store} {...providers}>
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <StaticRouter location={req.originalUrl} context={context}>
                <ReduxAsyncConnect
                  routes={routes}
                  store={store}
                  helpers={providers}
                >
                  {renderRoutes(routes)}
                </ReduxAsyncConnect>
              </StaticRouter>
            </ConnectedRouter>
            </ThemeProvider>
          </Provider>
        </Loadable.Capture>
      )
    );

    console.log({ html });
    const css = sheet.getStyleTags();
    const state = `window.__INITIAL_STATE__ = ${serialize(store.getState())}`;

    if (context.url) {
      return res.redirect(301, context.url);
    }

    const stats = await asyncGetStats('../../../dist/react-loadable.json');
    const bundles = getBundles(stats, modules);
    const scripts = getScripts(stats);

    const markup = (
      <Html
        bundles={bundles}
        css={css}
        html={html}
        scripts={scripts}
        state={state}
      />
    );

    const ssr = `<!doctype html>${renderToStaticMarkup(markup)}`;

    res.status(200).send(ssr);
  } catch (mountError) {
    res.status(500);
  }
};

export default render;
