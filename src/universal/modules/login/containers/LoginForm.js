import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import { AUTH_RESET_LOGIN_MESSAGE } from 'grow-actions/auth/constants';
import { FormButton, Text } from '../../forms/fields/';
import { ArrowRight } from '../../ui/icons/';
import { theme } from '../../../themes/';
// import { FadeIn } from '../../ui/transitions/';

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
        default: '#c4c4c4',
        focus: '#448aff',
      },
      radius: '3px',
      style: 'solid',
      width: '1px',
    },
    color: {
      placeholder: '#e3e3e3',
      value: '#262626',
    },
  },
  fields: { marginBottom: '1.75rem', flexDirection: 'column' },
};

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

const EmailSentContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.blue};
  background: #f4f8ff;
  padding: 2.5rem;
  margin-bottom: 6.6rem;
  border-radius: 2px;

  svg {
    display: block;
    margin-bottom: 1rem;
  }

  p:last-child {
    cursor: pointer;
    margin-bottom: 0;
  }
`;

class LoginForm extends Component {
  handleRest = () => {
    const { auth, dispatch } = this.props;

    /**
     * If the user has been sent a one time password we show a
     * message under the login form. Once they start typing again
     * we want to reset that message so they don't see it.
     */
    if (auth && auth.hasSentOneTimePass) {
      dispatch(reset('login'));
      dispatch({ type: AUTH_RESET_LOGIN_MESSAGE });
    }
  };

  render() {
    const {
      auth,
      emailLinkHandler,
      handleSubmit,
      loginEmail,
      authhasSentOneTimePass,
      submitting,
    } = this.props;
    const required = value =>
      value
        ? undefined
        : {
            defaultMessage: ' is required',
          };

    const fieldProps = {
      className: 'LoginForm',
    };

    return (
      <div>
        <form
          onSubmit={handleSubmit}
          onChange={this.handleRest}
          className="c-form LoginForm"
          id="login-form"
        >
          <h1 className="LoginHeader__heading">Login with email</h1>
          <p className="LoginHeader__text">
            We'll send you a one time password to get started.
          </p>

          {auth.hasSentOneTimePass ? (
            <EmailSentContainer>
              <p>
                A one time link has been sent to <strong>{loginEmail}</strong>
              </p>
              <p onClick={this.handleRest}>
                Use a <u>different email</u>
              </p>
            </EmailSentContainer>
          ) : (
            <ThemeProvider theme={LoginFormTheme}>
              <div>
                <fieldset>
                  <Field
                    name="email"
                    component={Text}
                    type="email"
                    label="Email"
                    placeholder="name@example.com"
                    validate={required}
                    {...fieldProps}
                  />
                </fieldset>
                <fieldset>
                  <Field
                    name="submitButton"
                    component={FormButton}
                    buttonText="Continue"
                    isSubmitting={submitting}
                    icon={ArrowRight}
                    {...fieldProps}
                  />
                </fieldset>
              </div>
            </ThemeProvider>
          )}
          <LoginFormSeparator>
            <LoginFormSeparatorText>or</LoginFormSeparatorText>
            <LoginFormSeparatorLine />
          </LoginFormSeparator>
          <EmailMeALinkButton onClick={emailLinkHandler}>
            Use email and password
          </EmailMeALinkButton>
        </form>
      </div>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
