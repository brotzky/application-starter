import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import { AUTH_RESET_LOGIN_MESSAGE } from 'grow-actions/auth/constants';
import {
  LoginHeaderHeading,
  LoginHeaderText,
  LoginForm as FormContainer,
} from 'gac-ui/components';
import { FormButton, Text, TextLink } from '../../forms/fields/';
import { theme } from '../../../themes/';

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

const LoginFormSeparatorLine = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  left: 0;
  top: 50%;
`;

const ReturnToLoginButton = styled.button`
  width: 100%;
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

export const LoginFormTheme = {
  ...theme,
  inputs: {
    height: '50px',
    padding: '1.8rem',
    fontSize: '1.6rem',
    boxShadow: 'none',
    width: '100%',
    border: {
      color: {
        default: '#e3e3e3',
        focus: '#448aff',
      },
      radius: '0px',
      style: 'solid',
      width: '1px',
    },
    color: {
      placeholder: '#e3e3e3',
      value: '#262626',
    },
  },
  fields: { flexDirection: 'column' },
};

class RequestResetPasswordForm extends Component {
  handleChange = () => {
    const { auth, dispatch } = this.props;

    /**
     * If the user has been sent a one time password we show a
     * message under the login form. Once they start typing again
     * we want to reset that message so they don't see it.
     */
    if (auth.hasSentOneTimePass) {
      dispatch({ type: AUTH_RESET_LOGIN_MESSAGE });
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const required = value =>
      value
        ? undefined
        : {
            defaultMessage: 'is required',
          };

    return (
      <FormContainer
        onSubmit={handleSubmit}
        onChange={this.handleChange}
        id="login-form"
      >
        <LoginHeaderHeading>Forgot your password?</LoginHeaderHeading>
        <LoginHeaderText>
          Please enter your email and we'll send you instructions on how to
          reset your password.
        </LoginHeaderText>
        <ThemeProvider theme={LoginFormTheme}>
          <div>
            <fieldset>
              <Field
                name="email"
                component={Text}
                type="email"
                label="Work email"
                validate={required}
                placeholder="you@example.com"
              />
            </fieldset>
            <fieldset>
              <Field
                name="submitButton"
                component={FormButton}
                buttonText="Send reset instructions"
                isSubmitting={submitting}
                size="xlarge"
                width="100%"
                margin="1.92rem 0"
              />
            </fieldset>
            <LoginFormSeparator>
              <LoginFormSeparatorText>or</LoginFormSeparatorText>
              <LoginFormSeparatorLine />
            </LoginFormSeparator>
            <ReturnToLoginButton>
              <TextLink text="Return to login" path="/login" />
            </ReturnToLoginButton>
          </div>
        </ThemeProvider>
      </FormContainer>
    );
  }
}

RequestResetPasswordForm = reduxForm({
  form: 'resetRequestPass',
})(RequestResetPasswordForm);

export default RequestResetPasswordForm;
