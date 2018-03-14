import React, { Component } from 'react';
import NewPasswordForm from './NewPasswordForm';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { authAuth0Login } from 'grow-actions/auth/auth-auth0-login';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import styled from 'styled-components';
import { resetPassword } from 'grow-actions/auth/auth0-reset-password';
import { getEnvProperties } from 'grow-actions/auth/auth';
import AuthFormWrapper from '../../auth/components/AuthFormWrapper';

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
    const { dispatch, location } = this.props;
    const searchQuery = location.search;

    dispatch(getEnvProperties());

    if (!searchQuery) {
      dispatch(push('/login'));
    }
  }

  handleImageLoaded = piece => {
    this.setState({ [piece]: true });
  };

  handleSubmit = data => {
    const {
      dispatch,
      location,
      envProperties: { connection, clientId },
    } = this.props;
    const keyInQuery = queryString.parse(location.search).key;
    const emailInQuery = queryString.parse(location.search).email;
    const hostname = location.hostname;
    const redirectUrl = hostname.includes('localhost')
      ? `http://localhost:8080/redirect`
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
        }),
      );
    }
  };

  renderHiddenForm = () => ({
    __html: this.props.responsedForm,
  });

  render() {
    const { formValues, location } = this.props;
    const nameInQuery = queryString.parse(location.search).name;
    const { newPassword, confirmPassword } = formValues;

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
            style={{ display: 'none' }}
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
  location: state.router.location,
});

export default connect(mapStateToProps)(NewPassword);
