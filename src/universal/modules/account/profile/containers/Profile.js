import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getUserProfile } from 'grow-actions/user/user';
import {
  profilePropType,
  dispatchPropType,
  paramsPropType,
} from 'gac-utils/proptypes';
import { Card } from '../../../ui/components';
import ProfileFormPlaceholder from '../components/ProfileFormPlaceholder';
import AccountShellWrapper from '../../shell/containers/AccountShellWrapper';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import AccountShellSection from '../../shell/components/AccountShellSection';
import UsersCreatePersonalFormWrapper from '../../users/components/UsersCreatePersonalForm';
import { FadeIn } from '../../../ui/transitions/';

import UsersCreateSubmitForm from '../../users/components/UsersCreateSubmitForm';
import AccountShellCreateSection from '../../shell/components/AccountShellCreateSection';
import AccountShellSubmitFooter from '../../shell/components/AccountShellSubmitFooter';

import ProfilePictureSection from '../components/ProfilePictureSection';
import ProfileTwoFactorSection from '../components/ProfileTwoFactorSection';
import ProfileManageAccountSection from '../components/ProfileManageAccountSection';
import ProfilePasswordSection from '../components/ProfilePasswordSection';

const ProfileCard = styled(Card)`
  flex: 0.6;
  padding: 2.4rem;
`;

const UsersCreateSection = styled.div`
  display: flex;
  border-top: 1px solid #dadada;
  justify-content: space-between;
  padding: 2.4rem 3.6rem 4.8rem;
`;

const UsersCreateSectionSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 3.6rem 4.8rem;
`;

const profileSections = [
  {
    header: 'Profile picture',
    text: 'Make it easier to identify yourself with a unique profile picture.',
    component: ProfilePictureSection,
  },
  {
    header: 'Password',
    text:
      'Create or reset your account password to enable logging in with email and password.',
    component: ProfilePasswordSection,
  },
  {
    header: 'Two-factor authentication',
    text:
      'Make your account more secure with two-factor authentication. Each time you log in you’ll be required to enter your password and a single-use authorization code.',
    component: ProfileTwoFactorSection,
  },
  {
    header: 'Manage account',
    text: 'Deacitvating an account will remove all access to this account.',
    component: ProfileManageAccountSection,
  },
];

/**
 * <Profile />
 *
 * This is the profile that each user is able to see. The user can edit, deactivate
 * and view user profiles from this component.
 *
 * @class Profile
 * @extends {Component}
 */

class Profile extends Component {
  componentDidMount() {
    this.handleGetProfile();
  }

  componentDidUpdate(prevProps) {
    // Update the Profile page if it's a new user based on the param
    if (
      this.props.params.accountSecondaryTab !==
        prevProps.params.accountSecondaryTab &&
      this.props.params.accountSecondaryTab
    ) {
      this.handleGetProfile();
    }
  }

  handleGetProfile = () => {
    const { dispatch, params: { accountSecondaryTab } } = this.props;

    dispatch({ type: 'RESET_PROFILE' });
    dispatch(getUserProfile(accountSecondaryTab));
  };

  render() {
    const {
      profile,
      profile: { email, firstName, lastName, isFetching },
      params: { accountSecondaryTab },
      userId,
    } = this.props;

    // Need to see if the currently logged in user is looking at their own profile or not
    const isUsersProfile = accountSecondaryTab === userId;

    // Showing Loading... or the user's name at the top of the Profile page
    const profileName = isFetching ? 'Loading...' : `${firstName} ${lastName}`;

    // "You have" or "Dennis has" depending on which profile you're viewing.
    const profileNameVerbConjucation = isUsersProfile
      ? 'You have'
      : `${firstName} has`;

    const profileHasLoaded = Boolean(email);

    return (
      <AccountShellSection>
        <AccountShellHeader
          linkBack={{ link: '/account/users', text: 'Users' }}
          text={profileName}
          padding
        />

        <AccountShellCreateSection
          header="Account information"
          text="Email address cannot be updated"
        >
          <ProfileCard>
            {profileHasLoaded ? (
              <FadeIn>
                <UsersCreatePersonalFormWrapper initialValues={profile} />
              </FadeIn>
            ) : (
              <ProfileFormPlaceholder />
            )}
          </ProfileCard>
        </AccountShellCreateSection>

        {profileSections.map(section => {
          const SectionComponent = section.component;

          return (
            <AccountShellCreateSection
              key={section.text}
              header={section.header}
              text={section.text}
            >
              <ProfileCard>
                {profileHasLoaded ? (
                  <FadeIn>
                    <SectionComponent
                      profile={profile}
                      isUsersProfile={isUsersProfile}
                      profileNameVerbConjucation={profileNameVerbConjucation}
                    />
                  </FadeIn>
                ) : (
                  <ProfileFormPlaceholder />
                )}
              </ProfileCard>
            </AccountShellCreateSection>
          );
        })}

        <AccountShellSubmitFooter>
          <UsersCreateSubmitForm buttonText="Save" />
        </AccountShellSubmitFooter>
      </AccountShellSection>
    );
  }
}

Profile.propTypes = {
  profile: profilePropType.isRequired,
  dispatch: dispatchPropType.isRequired,
  params: paramsPropType.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  userId: state.user.id,
});

export default AccountShellWrapper(connect(mapStateToProps)(Profile));
