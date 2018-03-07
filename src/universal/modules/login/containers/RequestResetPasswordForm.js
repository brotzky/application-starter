import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { ThemeProvider } from 'styled-components';
import { AUTH_RESET_LOGIN_MESSAGE } from 'grow-actions/auth/constants';
import { FormButton, Text, TextLink } from '../../forms/fields/';
import { ArrowRight } from '../../ui/icons/';
import { theme } from '../../../themes/';

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
        <h1 className="LoginHeader__heading">Forgot your password?</h1>
        <p className="LoginHeader__text">
          Please enter your email and we'll send you instructions on how to
          reset your password.
        </p>
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
                {...fieldProps}
              />
            </fieldset>
            <fieldset>
              <Field
                name="submitButton"
                component={FormButton}
                buttonText="Send reset instructions"
                isSubmitting={submitting}
                {...fieldProps}
              />
            </fieldset>
            <TextLink text="Return to login" path="/login" />
          </div>
        </ThemeProvider>
      </form>
    );
  }
}

RequestResetPasswordForm = reduxForm({
  form: 'resetRequestPass',
})(RequestResetPasswordForm);

export default RequestResetPasswordForm;
