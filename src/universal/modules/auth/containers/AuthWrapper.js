import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { authCheck } from 'grow-actions/auth/auth-check';
import { auth } from 'grow-actions/auth/auth';
import { getUser } from 'grow-actions/user/user';
import { getRoles } from 'grow-actions/roles/roles';
import docCookies from 'grow-utils/cookies';
import Shell from '../../shell/root/containers/Shell';
import { FadeInFast } from '../../ui/transitions/';
import AuthLoader from '../components/AuthLoader';
import AppConfig from './AppConfig';

/**
 * AuthWrapper
 * A higher order compenent used to wrap components that require
 * an authenticated session in order to be rendered.
 *
 * @param {Component} WrappedComponent A React component.
 * @returns {Component} The WrappedComponent is returned if the session
 * is authenticated, otherwise the current user will be redirected to /login.
 */
const AuthWrapper = WrappedComponent => {
  class AuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { count: 1, showCommitHash: false };
    }

    componentDidMount() {
      const { auth: authState, dispatch, location } = this.props;
      const { id, oneTimePassword } = this.getQueryStringVariables();

      document.addEventListener(
        'keydown',
        event => {
          if (event.shiftKey && event.altKey && event.keyCode === 68) {
            this.setState({ showCommitHash: !this.state.showCommitHash });
          }
        },
        false,
      );

      if (authState.id) {
        dispatch(getUser(authState.id));
        dispatch(getRoles());
      }

      // If the query string variables are present, make the Auth request.
      if (id && oneTimePassword) {
        return dispatch(auth({ id, oneTimePassword })).then(response => {
          if (response.error) {
            return dispatch(push(`/login`));
          }
          /**
           * If Auth returns the accessToken it means the user is authenticated
           * then we redirect them to the '/'.
           *
           * We have to redirect here because handleCheckAuth will not be called
           * because isAuthenticating evaluates to true and when it evaluates
           * to false isAuthenticated evaluates to true, so both times
           * handleCheckAuth does not get called.
           */
          const { payload: { data } } = response;

          docCookies.setItem('SID', data.accessToken);

          if (data && data.accessToken) {
            dispatch(getUser(data.id));
            dispatch(getRoles());
            return dispatch(push('/applications'));
          }
        });
      }
      // Otherwise make the CheckAuth request to see if the session is authenticated.
      return this.handleCheckAuth(authState.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      const { auth: authState, dispatch } = nextProps;
      const { id, oneTimePassword } = this.getQueryStringVariables();
      // just logged out
      if (!authState.isAuthenticated && this.props.auth.isAuthenticated) {
        return;
      }
      /**
       * If authentication is not happening and there are no query params
       * within the URL run handleCheckAuth
       */
      if (!authState.isAuthenticating && (!id && !oneTimePassword)) {
        this.handleCheckAuth(authState.isAuthenticated);
      }
    }

    getQueryStringVariables() {
      const locationSearch = queryString.parse(location.search);
      const { key: id, code: oneTimePassword } = locationSearch;

      return {
        id,
        oneTimePassword,
      };
    }

    handleCheckAuth(isAuthenticated) {
      const { dispatch, pathname } = this.props;

      if (!isAuthenticated) {
        dispatch(authCheck()).then(response => {
          const { payload: { data } } = response;
          if (data && data.accessToken) {
            /**
             * If the CheckAuth call returns the accessToken then we redirect the
             * user to '/'.
             */
            dispatch(getUser(data.id));
            dispatch(getRoles());
            return dispatch(push(pathname));
          }
          /**
           * If the CheckAuth call fails or does not return the accessToken
           * then we redirect the user to '/login'.
           */
          return dispatch(push('/login'));
        });
      } else {
        if (pathname === '/login' || pathname === '/login/') {
          return dispatch(push('/applications'));
        }
      }
    }

    render() {
      const { auth: authState, user } = this.props;
      return (
        <div>
          <Shell {...this.props}>
            <FadeInFast>
              {authState.isAuthenticated ? (
                <AppConfig
                  render={loaded =>
                    loaded && <WrappedComponent {...this.props} />
                  }
                />
              ) : (
                <AuthLoader />
              )}
            </FadeInFast>
          </Shell>
        </div>
      );
    }
  }

  return connect(state => ({
    auth: state.auth,
    pathname: state.router.location.pathname,
  }))(AuthenticatedComponent);
};

export default AuthWrapper;
