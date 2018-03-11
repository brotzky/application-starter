import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { enable2FAToUser, disable2FAToUser } from 'grow-actions/user/user';
import { Button } from '../../../ui/components';

const ProfileHeader = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 2rem;

  svg {
    margin: -1px 10px 0 0;
  }
`;

const ProfileText = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.greyDark};
  margin-bottom: 1.5em;
`;

const UnlockedIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <g fill="#4c4c4c">
      <path
        data-cap="butt"
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M7,11.1V6c0-2.8,2.2-5,5-5h0 c2.8,0,5,2.2,5,5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />{' '}
      <circle
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        cx="12"
        cy="16"
        r="7"
        strokeLinejoin="round"
      />{' '}
      <circle
        data-color="color-2"
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        cx="12"
        cy="15"
        r="2"
        strokeLinejoin="round"
      />{' '}
      <line
        data-color="color-2"
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="12"
        y1="17"
        x2="12"
        y2="19"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const LockedIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <g fill="#4c4c4c">
      <path
        data-cap="butt"
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M7,11.1V6c0-2.8,2.2-5,5-5h0 c2.8,0,5,2.2,5,5v5.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />{' '}
      <circle
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        cx="12"
        cy="16"
        r="7"
        strokeLinejoin="round"
      />{' '}
      <circle
        data-color="color-2"
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        cx="12"
        cy="15"
        r="2"
        strokeLinejoin="round"
      />{' '}
      <line
        data-color="color-2"
        fill="none"
        stroke="#4c4c4c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="12"
        y1="17"
        x2="12"
        y2="19"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
class ProfileTwoFactorSection extends Component {
  toggle2FA = () => {
    const { profile, dispatch } = this.props;

    if (!profile.auth0MfaEnabled) {
      return dispatch(enable2FAToUser(profile));
    }

    return dispatch(disable2FAToUser(profile));
  };

  render() {
    const {
      profile: { auth0MfaEnabled, auth0InviteStatus, auth0Updating },
      isUsersProfile,
      profileNameVerbConjucation,
    } = this.props;

    const isAuth0StatusNone = auth0InviteStatus === 'NONE';

    const toggle2FAText = auth0MfaEnabled
      ? 'Disable two-factor authentication'
      : 'Enable two-factor authentication';

    return (
      <div>
        <ProfileHeader>
          {auth0MfaEnabled ? (
            <span>
              <LockedIcon />Two-factor authentication is enabled.
            </span>
          ) : (
            <span>
              <UnlockedIcon />
              {profileNameVerbConjucation} not enabled two-factor
              authentication.
            </span>
          )}
        </ProfileHeader>
        <ProfileText>
          Add an extra layer of security when logging in to your account by
          enabling two-factor authentication.
        </ProfileText>
        <ProfileText>
          Please ensure your two-factor device has the official{' '}
          <strong>Google Authenticator</strong> app downloaded. Two-factor
          authentication is only supported with Google Authenticator.
        </ProfileText>
        {auth0InviteStatus === 'NONE' && (
          <div>
            <ProfileHeader>
              {profileNameVerbConjucation} to first create a password to enable
              two-factor authentication.
            </ProfileHeader>
          </div>
        )}
        {!isAuth0StatusNone &&
          isUsersProfile && (
            <Button
              text={toggle2FAText}
              appearance="default"
              size="large"
              onClick={this.toggle2FA}
              isSubmitting={auth0Updating}
            />
          )}
      </div>
    );
  }
}

export default connect()(ProfileTwoFactorSection);
