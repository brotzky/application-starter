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

const AsyncLogin = Loadable({
  loader: () => import('../modules/login/containers/Login'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncResetPassword = Loadable({
  loader: () => import('../modules/login/containers/ResetPassword'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncAuthloader = Loadable({
  loader: () => import('../modules/auth/components/AuthLoader'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncAcceptInvite = Loadable({
  loader: () => import('../modules/login/containers/NewPassword'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncMemberProfile = Loadable({
  loader: () => import('../modules/member/containers/Member'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncWorkbench = Loadable({
  loader: () => import('../modules/workbench/shell/containers/WorkbenchShell'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncAccount = Loadable({
  loader: () => import('../modules/account/shell/components/AccountShell'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncApplications = Loadable({
  loader: () => import('../modules/queue/containers/Queue'),
  loading: () => Loading,
  timeout: 500,
});

const AsyncNotFound = Loadable({
  loader: () => import('../modules/404/components/404'),
  loading: () => Loading,
  timeout: 500,
});

export const routes = [
  {
    component: Core,
    routes: [
      { exact: true, path: '/login', component: AsyncLogin },
      {
        exact: true,
        path: '/login/password-reset',
        component: AsyncResetPassword,
      },
      { exact: true, path: '/login/reset', component: AsyncResetPassword },
      { exact: true, path: '/redirect', component: AsyncAuthloader },
      { exact: true, path: '/accept-invite', component: AsyncAcceptInvite },
      {
        exact: true,
        path:
          '/members/:memberId/workbench/:workbenchId/:workbenchProduct/:workbenchTab?/:profileSection?',
        component: AsyncWorkbench,
      },
      {
        exact: true,
        path: '/members/:memberId/:profileSection?',
        component: AsyncMemberProfile,
      },
      {
        exact: true,
        path: '/applications/:page?',
        component: AsyncApplications,
      },
      {
        exact: true,
        path: '/account/:accountTab/:accountSecondaryTab?',
        component: AsyncAccount,
      },
      { component: AsyncNotFound },
    ],
  },
];

export default routes;
