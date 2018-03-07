import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { showModal, hideModal } from '../../../ui/modal/actions/actions-modal';
import { Button, ProfilePicture } from '../../../ui/components';

const ProfilePictureWrapper = styled.div`margin-bottom: 2rem;`;

class ProfilePictureSection extends Component {
  handleProfilePictureClick = () => {
    const { dispatch } = this.props;
    dispatch(
      showModal('PROFILE_PICTURE_MODAL', {
        closeProfilePictureModal: () => dispatch(hideModal()),
      }),
    );
  };

  render() {
    const { profile, isUsersProfile } = this.props;

    return (
      <div>
        <ProfilePictureWrapper>
          <ProfilePicture
            size="100"
            user={profile}
            allowUpdate={isUsersProfile}
          />
        </ProfilePictureWrapper>
        {isUsersProfile && (
          <Button
            text="Upload picture"
            appearance="default"
            size="large"
            onClick={this.handleProfilePictureClick}
          />
        )}
      </div>
    );
  }
}

export default connect()(ProfilePictureSection);
