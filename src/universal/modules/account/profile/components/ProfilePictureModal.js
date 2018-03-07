import React from 'react';
import styled from 'styled-components';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { FileUploadCrop } from '../../../forms/fields/';

const ProfilePictureHeader = styled.header`
  position: relative;
  padding: 2rem;
  border-bottom: 1px solid #e8e8e8;
  z-index: 1;
`;

const ProfilePictureHeading = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;
const ProfilePictureText = styled.p`
  font-size: 1.4rem;
  margin: 0;
  opacity: 0.5;
`;

const ProfilePictureModal = props => (
  <ModalContent
    modalAction={props.closeProfilePictureModal}
    modalSize="noPadding"
  >
    <ProfilePictureHeader>
      <ProfilePictureHeading>Select a profile photo</ProfilePictureHeading>
      <ProfilePictureText>
        Your profile photo is visible to everyone across the Admin Console.
      </ProfilePictureText>
    </ProfilePictureHeader>
    <FileUploadCrop />
  </ModalContent>
);

export default ProfilePictureModal;
