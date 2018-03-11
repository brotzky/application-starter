import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { ThemeProvider } from 'styled-components';
import { AUTH_RESET_LOGIN_MESSAGE } from 'grow-actions/auth/constants';
import { LoginForm as FormContainer } from 'gac-ui/components';
import { FormButton, Text } from '../../forms/fields/';
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
  fields: {
    flexDirection: 'column',
    marginBottom: '20px',
  },
};

class NewPasswordForm extends Component {
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
    const { handleSubmit, submitting, passwordValidationMessage } = this.props;
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
        <ThemeProvider theme={LoginFormTheme}>
          <div>
            <fieldset>
              <Field
                name="newPassword"
                component={Text}
                type="password"
                validate={required}
                label="New password"
              />
            </fieldset>
            <fieldset>
              <Field
                name="confirmPassword"
                component={Text}
                type="password"
                validate={required}
                label="Confirm password"
              />
            </fieldset>
            {passwordValidationMessage}
            <fieldset>
              <Field
                name="submitButton"
                component={FormButton}
                buttonText="Continue"
                isSubmitting={submitting}
                icon={ArrowRight}
              />
            </fieldset>
          </div>
        </ThemeProvider>
      </FormContainer>
    );
  }
}

NewPasswordForm = reduxForm({
  form: 'newPassword',
})(NewPasswordForm);

export default NewPasswordForm;
