import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import queryString from 'query-string';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { Transition } from '../../ui/transitions/';
import { CheckCircleFilled } from '../../ui/icons/';
import { Title } from '../../ui/components';
import {
  resetPasswordRequest,
  resetPassword,
} from 'grow-actions/auth/auth0-reset-password';
import RequestResetPasswordForm from './RequestResetPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import { LoginWrapper } from 'gac-utils/sc';
import AuthFromWrapper from '../../auth/components/AuthFormWrapper';

const LoginMessage = styled.div`
  position: absolute;
  left: 50%;
  bottom: -1rem;
  transform: translateX(-50%);
  text-align: center;
  color: #585858;
  font-weight: 400;
  font-size: ${props => props.theme.font.size3};
  width: 80%;
  word-break: break-word;

  &-enter {
    opacity: 0;
    transform: translateX(-50%) translateY(35px);
  }

  &-enter-active {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    transition: all 400ms ease-out;
  }
`;

const LoginMessageIcon = styled.span`
    margin-right: 1rem;
    position: relative;
    
    * {
      fill: ${props => props.theme.colors.blue};
    }

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 19px;
      height: 19px;
      background: white;
      border-radius: 50%;
    }
  }
`;

class ResetPassword extends Component {
  handleResetSubmit = data => {
    const { dispatch, pathname } = this.props;
    const { email } = data;
    const isResetPasswordForm = pathname.includes('/reset');

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
      pathname,
      workEmail,
      hasSentResetPasswordInstructions,
    } = this.props;

    const isResetPasswordForm = pathname.includes('/reset');

    return (
      <AuthFromWrapper>
        <Title title="Forgot your password?" />
        <LoginWrapper>
          {isResetPasswordForm ? (
            <ResetPasswordForm onSubmit={this.handleResetSubmit} />
          ) : (
            <RequestResetPasswordForm onSubmit={this.handleResetSubmit} />
          )}
          <Transition transitionName="LoginMessage">
            {hasSentResetPasswordInstructions && (
              <LoginMessage>
                <LoginMessageIcon>
                  <CheckCircleFilled />
                </LoginMessageIcon>{' '}
                If you have an account, a link with password reset instructions
                will be sent to <strong>{workEmail}</strong>
              </LoginMessage>
            )}
          </Transition>
        </LoginWrapper>
      </AuthFromWrapper>
    );
  }
}

const selector = formValueSelector('resetRequestPass');

const mapStateToProps = state => ({
  auth: state.auth,
  pathname: state.router.location.pathname,
  workEmail: selector(state, 'email'),
  hasSentResetPasswordInstructions: state.auth.hasSentResetPasswordInstructions,
});

export default connect(mapStateToProps)(ResetPassword);
