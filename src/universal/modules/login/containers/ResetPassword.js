import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { formValueSelector } from 'redux-form';
import queryString from 'query-string';
import { FadeDownSlow, Transition } from '../../ui/transitions/';
import { CheckCircleFilled } from '../../ui/icons/';
import {
  resetPasswordRequest,
  resetPassword,
} from 'grow-actions/auth/auth0-reset-password';
import RequestResetPasswordForm from './RequestResetPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

import AuthFromWrapper from '../../auth/components/AuthFormWrapper';

class ResetPassword extends Component {
  handleResetSubmit = data => {
    const { dispatch } = this.props;
    const { email } = data;

    if (email) {
      return dispatch(
        resetPasswordRequest({
          email,
        }),
      );
    }

    const keyInQuery = queryString.parse(window.location.search).key;
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
          oldPassword: data.oldPasswod,
          newPassword: data.newPassword,
        }),
      ).then(() => dispatch(push('/login')));
    }
  };

  render() {
    const {
      auth: { organization },
      workEmail,
      hasSentResetPasswordInstructions,
    } = this.props;
    // const isResetPasswordForm = window.location.href.includes('/reset');
    const isResetPasswordForm = false;

    return (
      <AuthFromWrapper>
        <div className="Login__wrapper">
          {isResetPasswordForm ? (
            <ResetPasswordForm onSubmit={this.handleResetSubmit} />
          ) : (
            <RequestResetPasswordForm onSubmit={this.handleResetSubmit} />
          )}
          <Transition transitionName="LoginMessage">
            {hasSentResetPasswordInstructions && (
              <div className="LoginMessage">
                <span className="LoginMessage__icon">
                  <CheckCircleFilled />
                </span>{' '}
                A link with password reset instructions has been sent to{' '}
                {workEmail}
              </div>
            )}
          </Transition>
        </div>
      </AuthFromWrapper>
    );
  }
}

const selector = formValueSelector('resetRequestPass');

const mapStateToProps = state => ({
  auth: state.auth,
  workEmail: selector(state, 'email'),
  hasSentResetPasswordInstructions: state.auth.hasSentResetPasswordInstructions,
});

export default connect(mapStateToProps)(ResetPassword);
