import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    background-position: 0;
    opacity: 0.3;
  }
  50% {
    background-position: 250px;    
    opacity: 1;
  }
  100% {
    background-position: 500px;
    opacity: 0.3;
  }
`;

const ProfileFormPlaceholderWrapper = styled.div`
  display: 'flex';
  flexdirection: 'column';
  alignitems: 'flex-end';
  paddingtop: '15px';
  animation: ${loading} 1.25s linear infinite;
`;

const ProfileFormPlaceholderWrapperItem = styled.div`
  height: 39px;
  margin-bottom: ${props => (props.noMargin ? '0px' : '36px')};
  width: 100%;
  background: rgba(0, 0, 0, 0.04);
`;

const ProfileFormPlaceholder = () => (
  <ProfileFormPlaceholderWrapper>
    <ProfileFormPlaceholderWrapperItem />
    <ProfileFormPlaceholderWrapperItem />
    <ProfileFormPlaceholderWrapperItem noMargin />
  </ProfileFormPlaceholderWrapper>
);

export default ProfileFormPlaceholder;
