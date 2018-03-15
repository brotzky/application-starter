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
  delay: 400,
});

const AsyncResetPassword = Loadable({
  loader: () => import('../modules/login/containers/ResetPassword'),
  loading: () => Loading,
  delay: 400,
});

const AsyncAuthloader = Loadable({
  loader: () => import('../modules/auth/components/AuthLoader'),
  loading: () => Loading,
  delay: 400,
});

const AsyncAcceptInvite = Loadable({
  loader: () => import('../modules/login/containers/NewPassword'),
  loading: () => Loading,
  delay: 400,
});

const AsyncMemberProfile = Loadable({
  loader: () => import('../modules/member/containers/Member'),
  loading: () => Loading,
  delay: 400,
});
// Loading the member profile page right away
AsyncMemberProfile.preload();

const AsyncWorkbench = Loadable({
  loader: () => import('../modules/workbench/shell/containers/WorkbenchShell'),
  loading: () => Loading,
  delay: 400,
});
// Loading the workbench profile page right away
AsyncWorkbench.preload();

const AsyncAccount = Loadable({
  loader: () => import('../modules/account/shell/components/AccountShell'),
  loading: () => Loading,
  delay: 400,
});

const AsyncApplications = Loadable({
  loader: () => import('../modules/queue/containers/Queue'),
  loading: () => Loading,
  delay: 400,
});

const AsyncNotFound = Loadable({
  loader: () => import('../modules/404/components/404'),
  loading: () => Loading,
  delay: 400,
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
