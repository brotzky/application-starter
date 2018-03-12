import React, { Component } from 'react';
import queryString from 'query-string';
import { auth0 } from 'grow-actions/auth/auth';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const AuthLoaderPadding = styled.div`
  padding-top: ${props => (props.isAuthRedirect ? '55px' : '0px')};
`;

const scaleRight = keyframes`
  0% {
    transform: scale(0) translateX(2px);
  }
  50% {
    transform: scale(10) translateX(-11px);
  }
  100% {
    transform: scale(0) translateX(0px);
  }
}`;

const scaleLeft = keyframes`
  0% {
    transform: scale(0) translateX(-2px);
  }
  50% {
    transform: scale(10) translateX(11px);
  }
  100% {
    transform: scale(0) translateX(0px);
  }
}`;

export const AuthLoaderWrapper = styled.div`
  color: black;
`;

export const AuthWrapperLoading = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AuthWrapperLogo = styled.img`
  height: 75px;
`;

export const AuthLoaderAnimation = styled.div`
  position: relative;
  margin-top: 4.2rem;
  height: 2px;
  width: 130px;
  background: ${props => props.theme.colors.greyBg};
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    height: 6px;
    width: 6px;
    top: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: ${props => props.theme.colors.blue};
    border-radius: 50%;
    animation: ${scaleRight} 2s ease infinite;
  }

  &::after {
    content: '';
    position: absolute;
    height: 6px;
    width: 6px;
    top: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: ${props => props.theme.colors.blue};
    border-radius: 50%;
    animation: ${scaleLeft} 2s ease infinite;
  }
`;

class AuthLoader extends Component {
  state = {
    isAuthRedirect:
      this.props.location &&
      this.props.location.hash &&
      (this.props.location.pathname === '/redirect' ||
        this.props.location.pathname === '/redirect/'),
    hasFiredAuth: false,
  };

  componentDidMount() {
    const { isAuthenticating, dispatch, location } = this.props;
    const { isAuthRedirect, hasFiredAuth } = this.state;

    if (isAuthRedirect && !hasFiredAuth && !isAuthenticating) {
      const idToken = queryString.parse(location.hash.slice(1)).id_token;
      this.setState({ authFired: true });

      dispatch(auth0({ idToken })).then(response => {
        window.location.href = '/applications'; //reload page to avoid redirect callback hell
      });
    }
  }

  render() {
    return (
      <AuthLoaderPadding isAuthRedirect={this.state.isAuthRedirect}>
        <AuthWrapperLoading>
          <AuthLoaderWrapper>
            <AuthWrapperLogo
              src="/static/img/logos/organizations/grow.svg"
              alt="Grow Logo"
            />
          </AuthLoaderWrapper>
          <AuthLoaderAnimation />
        </AuthWrapperLoading>
      </AuthLoaderPadding>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
  isAuthenticating: state.auth.isAuthenticating,
});

export default connect(mapStateToProps)(AuthLoader);
