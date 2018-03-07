import React, { Component } from 'react';
import NewPasswordForm from './NewPasswordForm';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { authAuth0Login } from 'grow-actions/auth/auth-auth0-login';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import styled, { keyframes } from 'styled-components';
import { FadeDownSlow } from '../../ui/transitions/';
import { resetPassword } from 'grow-actions/auth/auth0-reset-password';
import { getEnvProperties } from 'grow-actions/auth/auth';
import AuthFormWrapper from '../../auth/components/AuthFormWrapper';

const NewPasswordContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewPasswordWrapper = styled.div`
  width: 38%;
  height: 100vh;
  display: flex;
  padding: 3.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 400px;
`;

const NewPasswordHeader = styled.h2`
  font-weight: 600;
  font-size: 3rem;
  padding-left: 3.375rem;
  margin-bottom: 2rem;
`;

const NewPasswordText = styled.p`
  font-size: 1.8rem;
  padding-left: 3.375rem;
  color: #616161;
  margin-bottom: 2rem;
`;

const PasswordValidationWrapper = styled.div`
  color: #f44336;
`;

class NewPassword extends Component {
  state = {
    tablet: false,
    shadow: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const searchQuery = window.location.search;

    dispatch(getEnvProperties());

    if (!searchQuery) {
      dispatch(push('/login'));
    }
  }

  handleImageLoaded = piece => {
    this.setState({ [piece]: true });
  };

  handleSubmit = data => {
    const { dispatch, envProperties: { connection } } = this.props;
    const keyInQuery = queryString.parse(window.location.search).key;
    const emailInQuery = queryString.parse(window.location.search).email;
    const hostname = window.location.hostname;
    const redirectUrl = hostname.includes('localhost')
      ? 'http://localhost:3000/redirect'
      : `https://${hostname}/redirect`;
    const isFormFilled = data.newPassword && data.confirmPassword;
    const passwordsMath = data.newPassword === data.confirmPassword;
    const isResetPasswordFormValid = !!(
      keyInQuery &&
      isFormFilled &&
      passwordsMath
    );

    if (isResetPasswordFormValid) {
      return dispatch(
        resetPassword({
          userKey: keyInQuery,
          newPassword: data.newPassword,
        }),
      ).then(() =>
        dispatch(
          authAuth0Login({
            password: data.newPassword,
            username: emailInQuery,
            // auth0Client: "eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4wLjAifQ==",
            client_id: 'mZzKUAvep5oZcFIY6tmNb4LeRag2kNvE',
            connection,
            response_type: 'token id_token',
            redirect_uri: redirectUrl,
            sso: true,
            tenant: 'growtechnologies',
          }),
        ).then(() => {
          if (this.form[0]) {
            this.form[0].submit();
          }
        }),
      );
    }
  };

  renderHiddenForm = () => ({
    __html: this.props.responsedForm,
  });

  render() {
    const { user, formValues } = this.props;
    const { tablet, shadow } = this.state;
    const nameInQuery = queryString.parse(window.location.search).name;
    const { newPassword, confirmPassword } = formValues;
    this.form = document.getElementsByName('hiddenform');
    const passwordValidationMessage =
      newPassword && confirmPassword && newPassword !== confirmPassword ? (
        <PasswordValidationWrapper>
          Passwords don't match
        </PasswordValidationWrapper>
      ) : null;

    return (
      <AuthFormWrapper>
        <div>
          <NewPasswordHeader>Hi, {nameInQuery}!</NewPasswordHeader>
          <NewPasswordText>
            Welcome to Grow Admin Console. To get started, please create a new
            password.
          </NewPasswordText>
          <NewPasswordForm
            onSubmit={this.handleSubmit}
            passwordValidationMessage={passwordValidationMessage}
          />
          <div
            className="hidden"
            dangerouslySetInnerHTML={this.renderHiddenForm()}
          />
        </div>
      </AuthFormWrapper>
    );
  }
}

NewPassword.defaultProps = {
  formValues: {
    newPassword: '',
    confirmPassword: '',
  },
};

const mapStateToProps = state => ({
  user: state.user,
  formValues: getFormValues('newPassword')(state),
  responsedForm: state.auth.responsedForm,
  envProperties: state.permissions.envProperties,
});

export default connect(mapStateToProps)(NewPassword);
