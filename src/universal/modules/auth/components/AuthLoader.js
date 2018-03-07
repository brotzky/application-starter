import React from 'react';
import queryString from 'query-string';
import { auth0 } from 'grow-actions/auth/auth';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AuthLoaderPadding = styled.div`
  padding-top: ${props => (props.isAuthRedirect ? '55px' : '0px')};
`;

const AuthLoader = ({ location, dispatch }) => {
  const isAuthRedirect =
    location && location.hash && location.pathname === '/redirect';

  if (isAuthRedirect) {
    const idToken = queryString.parse(location.hash.slice(1)).id_token;

    dispatch(auth0({ idToken })).then(() => dispatch(push('/applications')));
  }

  return (
    <AuthLoaderPadding isAuthRedirect={isAuthRedirect}>
      <div className="AuthWrapper__loading">
        <div className="AuthLoader">
          <img
            className="AuthWrapper__logo"
            src="/static/img/logos/organizations/grow.svg"
            alt="Grow Logo"
          />
        </div>
        <div className="AuthLoader__animation">
          <div className="AuthLoader__animation-ball" />
        </div>
      </div>
    </AuthLoaderPadding>
  );
};

export default connect()(AuthLoader);
