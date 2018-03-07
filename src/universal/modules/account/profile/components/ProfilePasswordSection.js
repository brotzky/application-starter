import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { change, getFormValues } from 'redux-form';
import { resetPasswordRequest } from 'grow-actions/auth/auth0-reset-password';
import {
  addPasswordToUserFromProfile,
  updatePassword,
} from 'grow-actions/user/user';
import UserAddNewPasswordForm from '../../users/components/UserAddNewPasswordForm';
import { Button } from '../../../ui/components';

const ProfileHeader = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

const ProfileText = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.greyDark};
`;

const PasswordValidationWrapper = styled.div`
  color: #f44336;
  margin-bottom: 1rem;
`;

class ProfilePasswordSection extends Component {
  addPassword = () => {
    const { dispatch, profile, formValues } = this.props;
    const { newPassword, confirmPassword } = formValues;
    const arePasswordsMatch =
      newPassword && confirmPassword && newPassword === confirmPassword;

    if (arePasswordsMatch) {
      dispatch(
        addPasswordToUserFromProfile({
          password: newPassword,
          email: profile.email,
        }),
      );
    }
  };

  resetPasswordRequestHandler = () => {
    const { dispatch, profile } = this.props;

    dispatch(
      resetPasswordRequest({
        email: profile.email,
      }),
    );
  };

  toggleNewPasswordFormVisibility = () => {
    const { dispatch, formValues } = this.props;
    const { isAddPasswordFormVisible } = formValues;

    dispatch(
      change(
        'new-password',
        'isAddPasswordFormVisible',
        !isAddPasswordFormVisible,
      ),
    );
  };

  updatePasswordHandler = () => {
    const { dispatch, profile: { email }, formValues } = this.props;
    const { oldPassword, newPassword } = formValues;

    dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        email,
      }),
    ).then(({ payload }) => {
      if (!payload) {
        return this.toggleNewPasswordFormVisibility();
      }
    });
  };

  render() {
    const {
      formValues,
      profile: { auth0InviteStatus },
      isUsersProfile,
      profileNameVerbConjucation,
    } = this.props;

    const {
      confirmPassword,
      isAddPasswordFormVisible,
      newPassword,
    } = formValues;

    const passwordValidationMessage =
      newPassword && confirmPassword && newPassword !== confirmPassword ? (
        <PasswordValidationWrapper>
          Passwords do not match
        </PasswordValidationWrapper>
      ) : null;

    return (
      <div>
        {auth0InviteStatus === 'NONE' ? !isAddPasswordFormVisible ? (
          <div>
            <ProfileHeader>
              {profileNameVerbConjucation} not enabled password authentication.
            </ProfileHeader>
            <ProfileText>
              Add a password to enable login with email and password.
            </ProfileText>
            {isUsersProfile && (
              <Button
                text="Add new password"
                appearance="default"
                size="large"
                onClick={this.toggleNewPasswordFormVisibility}
              />
            )}
          </div>
        ) : (
          <UserAddNewPasswordForm
            toggleNewPasswordFormVisibility={
              this.toggleNewPasswordFormVisibility
            }
            addPassword={this.addPassword}
            passwordValidationMessage={passwordValidationMessage}
            updatePasswordHandler={this.updatePasswordHandler}
            formValues={formValues}
            auth0InviteStatus={auth0InviteStatus}
          />
        ) : (
          <div>
            {!isAddPasswordFormVisible ? (
              <div>
                <ProfileHeader>
                  {profileNameVerbConjucation} enabled password authentication.
                </ProfileHeader>
                <ProfileText>
                  {profileNameVerbConjucation} the ability to login with email
                  and password.
                </ProfileText>
                {isUsersProfile && (
                  <Button
                    onClick={this.toggleNewPasswordFormVisibility}
                    text="Reset password"
                    appearance="default"
                    size="large"
                  />
                )}
              </div>
            ) : (
              <UserAddNewPasswordForm
                toggleNewPasswordFormVisibility={
                  this.toggleNewPasswordFormVisibility
                }
                addPassword={this.addPassword}
                passwordValidationMessage={passwordValidationMessage}
                updatePasswordHandler={this.updatePasswordHandler}
                formValues={formValues}
                auth0InviteStatus={auth0InviteStatus}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

ProfilePasswordSection.defaultProps = {
  formValues: {
    isAddPasswordFormVisible: false,
  },
};

const mapStateToProps = state => ({
  formValues: getFormValues('new-password')(state),
});

export default connect(mapStateToProps)(ProfilePasswordSection);
