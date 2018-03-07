import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Core from '../modules/core/containers/Core';

const AsyncLogin = Loadable({
  loader: () => import('../modules/login/containers/Login'),
  loading: () => <div>Loading</div>,
});

const AsyncResetPassword = Loadable({
  loader: () => import('../modules/login/containers/ResetPassword'),
  loading: () => <div>Loading</div>,
});

const AsyncAuthloader = Loadable({
  loader: () => import('../modules/auth/components/AuthLoader'),
  loading: () => <div>Loading</div>,
});

const AsyncAcceptInvite = Loadable({
  loader: () => import('../modules/login/containers/NewPassword'),
  loading: () => <div>Loading</div>,
});

const AsyncMemberProfile = Loadable({
  loader: () => import('../modules/member/containers/Member'),
  loading: () => <div>Loading</div>,
});

const AsyncWorkbench = Loadable({
  loader: () => import('../modules/workbench/shell/containers/WorkbenchShell'),
  loading: () => <div>Loading</div>,
});

const AsyncProduct = Loadable({
  loader: () => import('../modules/product/shell/containers/ProductShell'),
  loading: () => <div>Loading</div>,
});

const AsyncAccount = Loadable({
  loader: () => import('../modules/account/shell/components/AccountShell'),
  loading: () => <div>Loading</div>,
});

const AsyncApplications = Loadable({
  loader: () => import('../modules/queue/containers/Queue'),
  loading: () => <div>Loading</div>,
});

const AsyncNotFound = Loadable({
  loader: () => import('../modules/404/components/404'),
  loading: () => <div>Loading</div>,
});

export const routes = [
  {
    component: Core,
    routes: [
      { path: '/', exact: true, component: Core },
      { path: '/login', exact: true, component: AsyncLogin },
      {
        path: '/login/password-reset',
        exact: true,
        component: AsyncResetPassword,
      },
      { path: '/login/reset', exact: true, component: AsyncResetPassword },
      { path: '/redirect', exact: true, component: AsyncAuthloader },
      { path: '/accept-invite', exact: true, component: AsyncAcceptInvite },
      {
        path: '//members/:memberId/:profileSection?',
        exact: true,
        component: AsyncMemberProfile,
      },
      {
        path:
          '/members/:memberId/workbench/:workbenchId/:workbenchProduct/:workbenchTab?/:profileSection?',
        exact: true,
        component: AsyncWorkbench,
      },
      {
        path: '/members/:memberId/product/:productCategory/:productId',
        exact: true,
        component: AsyncProduct,
      },
      {
        path: '/applications/:page?',
        exact: true,
        component: AsyncApplications,
      },
      {
        path: '/account/:accountTab/:accountSecondaryTab?',
        exact: true,
        component: AsyncAccount,
      },
      { component: AsyncNotFound },
    ],
  },
];

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Core} />
    <Route exact path="/login" component={AsyncLogin} />
    <Route exact path="/login/password-reset" component={AsyncResetPassword} />
    <Route exact path="/login/reset" component={AsyncResetPassword} />
    <Route exact path="/redirect" component={AsyncAuthloader} />
    <Route exact path="/accept-invite" component={AsyncAcceptInvite} />
    <Route
      exact
      path="/members/:memberId/:profileSection?"
      component={AsyncMemberProfile}
    />
    <Route
      exact
      path="/members/:memberId/workbench/:workbenchId/:workbenchProduct/:workbenchTab?/:profileSection?"
      component={AsyncWorkbench}
    />
    <Route
      exact
      path="/members/:memberId/product/:productCategory/:productId"
      component={AsyncProduct}
    />
    <Route exact path="/applications/:page?" component={AsyncApplications} />
    <Route
      exact
      path="/account/:accountTab/:accountSecondaryTab?"
      component={AsyncAccount}
    />
    <Route path="*" component={AsyncNotFound} />
  </Switch>
);

export default Routes;
