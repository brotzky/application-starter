import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { User } from '../../icons';
import { showModal, hideModal } from '../../modal/actions/actions-modal';
import { userPropType, dispatchPropType } from 'gac-utils/proptypes';

const ProfileImage = styled.img`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => props.borderRadius}%;
  opacity: ${props => (props.alreadyHasImage ? 1 : props.imageLoaded ? 1 : 0)};
  transition: opacity 180ms ease;
`;

const ProfileImageWrapper = styled.div`
  background: #fafafa;
`;

const ClickHandler = styled.div`
  position: relative;
  cursor: ${props => (props.allowUpdate ? 'pointer' : 'inherit')};
  border-radius: ${props => props.borderRadius}%;
  overflow: hidden;
  height: ${props => props.size}px;
  background: #fafafa;

  max-width: ${props => props.size}px;
  min-width: ${props => props.size}px;

  ${props =>
    props.isActive &&
    !props.allowUpdate &&
    `box-shadow:0 0 0 3px ${props.theme.colors.blue}`};

  ${props =>
    props.allowUpdate
      ? `
    &::after {
      content: 'Change';
      background: rgba(0,0,0,0.4);
      position: absolute;
      left: 0;
      right: 0;
      top: 72%;
      bottom: 0;
      color: white;
      font-weight: 600;
      font-size: 0.5rem;
      text-align: center;
      padding-top: 2px;
    }
  `
      : ''};
`;

class ProfilePicture extends Component {
  state = {
    imageLoaded: false,
    alreadyHasImage: !!this.props.user.profilePicture,
  };

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  handleProfilePictureClick = () => {
    const { dispatch } = this.props;
    dispatch(
      showModal('PROFILE_PICTURE_MODAL', {
        closeProfilePictureModal: () => dispatch(hideModal()),
      }),
    );
  };

  render() {
    const {
      borderRadius,
      size,
      user: { firstName, email, profilePicture },
      isActive,
      allowUpdate,
    } = this.props;
    const { alreadyHasImage, imageLoaded } = this.state;

    /**
     * Using the blob in memory as a source if a user updates their pic.
     * Otherwise use the googleusercontent path returned from backend
     */
    const profilePictureSrc =
      profilePicture && profilePicture.includes('blob')
        ? profilePicture
        : `${profilePicture}=s${size}-c`;

    return (
      <ClickHandler
        allowUpdate={allowUpdate}
        onClick={allowUpdate ? this.handleProfilePictureClick : () => {}}
        isActive={isActive}
        borderRadius={borderRadius}
        size={size}
      >
        {email && (
          <ProfileImageWrapper>
            {profilePicture ? (
              <ProfileImage
                size={size}
                borderRadius={borderRadius}
                src={profilePictureSrc}
                onLoad={this.handleImageLoaded}
                imageLoaded={imageLoaded}
                alreadyHasImage={alreadyHasImage}
                alt={`${firstName}'s profile picture`}
              />
            ) : (
              <User height={size} width={size} />
            )}
          </ProfileImageWrapper>
        )}
      </ClickHandler>
    );
  }
}

ProfilePicture.defaultProps = {
  isActive: false,
  size: 32,
  borderRadius: 50,
};

ProfilePicture.propTypes = {
  borderRadius: PropTypes.number,
  user: userPropType.isRequired,
  dispatch: dispatchPropType.isRequired,
  size: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

// connecting so we can add a dispatch to the props
export default connect()(ProfilePicture);
