import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import { AUTH_RESET_LOGIN_MESSAGE } from 'grow-actions/auth/constants';
import { FormButton, Text, TextLink, Button } from '../../forms/fields/';
import { LoginFormTheme } from './LoginForm';

const LoginFormSeparator = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
`;

const LoginFormSeparatorText = styled.span`
  position: relative;
  width: 50px;
  background-color: #fff;
  text-align: center;
  z-index: 1;
`;

const LoginFormSeparatorLine = styled.span`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  left: 0;
  top: 50%;
`;

const EmailMeALinkButton = styled.div`
  cursor: pointer;
  text-align: center;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  background-color: #f8f8f8;
  padding: 0.28125rem 0;
  height: 5rem;
  line-height: 4.375rem;
  font-size: 1.5rem;
  font-weight: 600;

  svg {
    margin-right: 14px;
  }
`;

const PlaneIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <g fill="#262626">
      <polyline
        fill="none"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        points="
4.504,9.503 12.5,15.5 15.5,0.5 0.5,6.5 2.502,8.001 "
        data-cap="butt"
      />
      <polyline
        fill="none"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        points="
7.63,11.848 4.5,15.5 4.504,9.503 9,6.5 "
        data-cap="butt"
      />
    </g>
  </svg>
);

class LoginFormAuth0 extends Component {
  handleChange = () => {
    const { auth, dispatch } = this.props;

    /**
     * If the user has been sent a one time password we show a
     * message under the login form. Once they start typing again
     * we want to reset that message so they don't see it.
     */
    if (auth && auth.hasSentOneTimePass) {
      dispatch({ type: AUTH_RESET_LOGIN_MESSAGE });
    }
  };

  render() {
    const { handleSubmit, submitting, emailLinkHandler } = this.props;
    const required = value =>
      value
        ? undefined
        : {
            defaultMessage: 'is required',
          };

    const fieldProps = {
      className: 'LoginForm',
    };

    return (
      <form
        onSubmit={handleSubmit}
        onChange={this.handleChange}
        className="c-form LoginForm"
        id="login-form"
      >
        <h1 className="LoginHeader__heading">Welcome back!</h1>
        <p className="LoginHeader__text">
          Sign into your account with email and password or use a login link.
        </p>
        <ThemeProvider theme={LoginFormTheme}>
          <div>
            <fieldset>
              <Field
                name="email"
                component={Text}
                type="email"
                placeholder="you@example.com"
                label="Email"
                validate={required}
                {...fieldProps}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                component={Text}
                type="password"
                placeholder="password"
                label="Password"
                validate={required}
                {...fieldProps}
              />
            </fieldset>
            <fieldset>
              <Field
                name="submitButton"
                component={FormButton}
                buttonText="Sign in"
                isSubmitting={submitting}
                {...fieldProps}
              />
            </fieldset>
            <TextLink text="Forgot password?" path="/login/password-reset" />
            <LoginFormSeparator>
              <LoginFormSeparatorText>or</LoginFormSeparatorText>
              <LoginFormSeparatorLine />
            </LoginFormSeparator>
            <EmailMeALinkButton onClick={emailLinkHandler}>
              <PlaneIcon />
              Email Me A Link
            </EmailMeALinkButton>
          </div>
        </ThemeProvider>
      </form>
    );
  }
}

LoginFormAuth0 = reduxForm({
  form: 'loginAuth0',
})(LoginFormAuth0);

export default LoginFormAuth0;
