import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';
import configureStore from '../universal/redux/store';

import App from '../universal/app/App';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const history = createHistory();
const store = configureStore(history, initialState);

if (module.hot) module.hot.accept();

Loadable.preloadReady().then(() => {
  const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;

  renderMethod(
    <App store={store} history={history} />,
    document.getElementById('app'),
  );
});
