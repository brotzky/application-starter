import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { reduxForm, formValueSelector } from 'redux-form';
import queryString from 'query-string';
import docCookies from 'grow-utils/cookies';
import { authOneTimePass } from 'grow-actions/auth/auth-one-time-pass';
import { authAuth0Login } from 'grow-actions/auth/auth-auth0-login';
import { getEnvProperties } from 'grow-actions/auth/auth';
import { authToken } from 'grow-actions/auth/auth-token';
import { capitalizeString } from 'grow-utils/stringFormatting';
import LoginForm from './LoginForm';
import LoginFormAuth0 from './LoginFormAuth0';

import AuthFromWrapper from '../../auth/components/AuthFormWrapper';

class Login extends Component {
  state = {
    isAuth0FormVisible: true,
  };

  componentDidMount() {
    const { auth, dispatch, location } = this.props;
    const { id, oneTimePassword } = this.getQueryStringVariables();

    dispatch(getEnvProperties());
    // If the user is already authenticated, redirect them to '/'.
    if (auth.isAuthenticated) {
      return dispatch(push('/'));
    }

    if (oneTimePassword) {
      return dispatch(push(`/?key=${id}&code=${oneTimePassword}`));
    }

    if (!docCookies.getItem('SID')) {
      /**
       * We fire off for authToken if there's no SID already set and it'll
       * register into redux state. This is then handled within <Core />
       *
       * if (!token && auth.accessToken) {
       *   return docCookies.setItem('SID', auth.accessToken);
       * }
       */
      return dispatch(authToken());
    }
  }

  getQueryStringVariables = () => {
    const locationSearch = queryString.parse(location.search);
    const { key: id, code: oneTimePassword } = locationSearch;

    return {
      id,
      oneTimePassword,
    };
  };

  handleSubmit = data => {
    const { dispatch, envProperties: { connection } } = this.props;

    const hostname = window.location.hostname;
    const hiddenForm = document.getElementsByName('hiddenform');

    const redirectUrl = hostname.includes('localhost')
      ? 'http://localhost:3000/redirect'
      : `https://${hostname}/redirect`;

    if (!this.state.isAuth0FormVisible) {
      return dispatch(authOneTimePass(data));
    }

    const isFormFilled = data.password && data.email;

    if (isFormFilled) {
      return dispatch(
        authAuth0Login({
          password: data.password,
          username: data.email,
          // auth0Client: "eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4wLjAifQ==",
          client_id: 'mZzKUAvep5oZcFIY6tmNb4LeRag2kNvE',
          connection,
          response_type: 'token id_token',
          redirect_uri: redirectUrl,
          sso: true,
          tenant: 'growtechnologies',
        }),
      ).then(() => {
        if (hiddenForm) {
          hiddenForm[0].submit();
        }
      });
    }
  };

  emailLinkHandler = () => {
    const { change } = this.props;
    const { isAuth0FormVisible } = this.state;

    change('isAuth0FormVisible', !isAuth0FormVisible);
    this.setState({ isAuth0FormVisible: !isAuth0FormVisible });
  };

  renderMessage = message => {
    if (Array.isArray(message)) {
      return (
        <div className="LoginMessage">
          {message.map(text => <span key={text}>{text}</span>)}
        </div>
      );
    }
    return <div className="LoginMessage">{message}</div>;
  };

  renderLoginForm() {
    const { auth, loginEmail } = this.props;

    if (!this.state.isAuth0FormVisible) {
      return (
        <div className="Login__form-wrapper">
          <LoginForm
            auth={auth}
            loginEmail={loginEmail}
            emailLinkHandler={this.emailLinkHandler}
            onSubmit={this.handleSubmit}
          />
          {auth.errors &&
            auth.errors.length > 0 &&
            this.renderMessage(
              auth.errors.map(err => capitalizeString(err, '_', ' ')),
            )}
        </div>
      );
    }

    return (
      <div className="Login__form-wrapper">
        <LoginFormAuth0
          onSubmit={this.handleSubmit}
          emailLinkHandler={this.emailLinkHandler}
        />
      </div>
    );
  }

  renderHiddenForm = () => ({
    __html: this.props.responsedForm,
  });

  render() {
    return (
      <AuthFromWrapper>
        <div className="Login__wrapper">
          {this.renderLoginForm()}
          <div
            className="hidden"
            dangerouslySetInnerHTML={this.renderHiddenForm()}
          />
        </div>
      </AuthFromWrapper>
    );
  }
}

const selector = formValueSelector('login');
const selectorLoginWrapper = formValueSelector('loginWrapper');

Login = reduxForm({
  form: 'loginWrapper',
})(Login);

const mapStateToProps = state => ({
  auth: state.auth,
  responsedForm: state.auth.responsedForm,
  loginEmail: selector(state, 'email'),
  envProperties: state.permissions.envProperties,
});

export default connect(mapStateToProps)(Login);
// export default () => <AuthFromWrapper>Login</AuthFromWrapper>;
