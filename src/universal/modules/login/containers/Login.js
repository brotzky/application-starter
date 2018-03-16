import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
import { LoginWrapper, LoginFormWrapper } from 'gac-utils/sc';
import { Title } from '../../ui/components';
import AuthFromWrapper from '../../auth/components/AuthFormWrapper';
import AuthWrapper from '../../auth/containers/AuthWrapper';

class Login extends Component {
  state = {
    isAuth0FormVisible: true,
  };

  componentDidMount() {
    const { auth, dispatch, location } = this.props;
    const { id, oneTimePassword } = this.getQueryStringVariables();
    dispatch(getEnvProperties());

    if (auth.isAuthenticated) {
      return dispatch(push('/applications'));
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
    const { dispatch, envProperties: { connection, clientId } } = this.props;
    const hostname = window.location.hostname;
    const redirectUrl = hostname.includes('localhost')
      ? `http://localhost:8080/redirect`
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
          client_id: clientId,
          connection,
          response_type: 'token id_token',
          redirect_uri: redirectUrl,
          sso: true,
          tenant: 'growtechnologies',
        }),
      ).then(() => {
        const hiddenForm = document.getElementsByName('hiddenform')[0];

        if (hiddenForm) {
          hiddenForm.submit();
        }
      });
    }
  };

  emailLinkHandler = () => {
    this.setState({ isAuth0FormVisible: !this.state.isAuth0FormVisible });
  };

  renderMessage = message => {
    if (Array.isArray(message)) {
      return <div>{message.map(text => <span key={text}>{text}</span>)}</div>;
    }
    return <div>{message}</div>;
  };

  renderLoginForm() {
    const { auth, loginEmail } = this.props;

    if (!this.state.isAuth0FormVisible) {
      return (
        <LoginFormWrapper>
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
        </LoginFormWrapper>
      );
    }

    return (
      <LoginFormWrapper>
        <LoginFormAuth0
          auth={auth}
          onSubmit={this.handleSubmit}
          emailLinkHandler={this.emailLinkHandler}
        />
      </LoginFormWrapper>
    );
  }

  renderHiddenForm = () => ({
    __html: this.props.responsedForm,
  });

  render() {
    const title = this.state.isAuth0FormVisible
      ? 'Sign into your account'
      : 'Sign with email';

    return (
      <AuthFromWrapper>
        <Title title={title} />
        <LoginWrapper>
          {this.renderLoginForm()}
          {this.props.responsedForm && (
            <div
              style={{ display: 'none' }}
              dangerouslySetInnerHTML={this.renderHiddenForm()}
            />
          )}
        </LoginWrapper>
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
  isAuth0Form: !!state.form.loginAuth0,
  responsedForm: state.auth.responsedForm,
  loginEmail: selector(state, 'email'),
  envProperties: state.permissions.envProperties,
});

export default connect(mapStateToProps)(Login);
