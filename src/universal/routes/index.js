import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Core from '../modules/core/containers/Core';

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.timedOut) {
    return null;
  } else if (props.pastDelay) {
    return null;
  } else {
    return null;
  }
}

const AsyncNotFound = Loadable({
  loader: () => import('../modules/not-found/components/NotFound'),
  loading: () => Loading,
  delay: 400,
});
// Loading the workbench profile page right away
AsyncNotFound.preload();

export const routes = [
  {
    component: Core,
    routes: [
      { exact: true, path: '/', component: <div>Home</div> },
      { exact: true, path: '/login', component: <div>Login</div> },
      {
        exact: true,
        path: '/login/reset-password',
        component: <div>Login</div>,
      },
      {
        exact: true,
        path: '/login/reset-password/confirm',
        component: <div>Login</div>,
      },
      { component: AsyncNotFound },
    ],
  },
];

export default routes;
