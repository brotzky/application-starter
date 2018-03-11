import React from 'react';
import styled from 'styled-components';

const UserPlaceholderContainer = styled.div`
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #efefef;
`;

const UserMainInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfilePicture = styled.div`
  margin-right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const UserLine = styled.div`
  display: flex;
  width: ${props => props.width}px;
  background-color: #f0f0f0;
  height: 15px;
  margin-bottom: 10px;
`;

const UserButton = styled.div`
  width: 86px;
  height: 24px;
  margin-left: 15px;
  background-color: #f0f0f0;
`;

const UsersPlaceholderItem = () => (
  <UserPlaceholderContainer>
    <UserHeader>
      <UserMainInfo>
        <UserProfilePicture />
        <div>
          <UserLine width={250} />
          <UserLine width={350} />
        </div>
      </UserMainInfo>
      <UserMainInfo>
        <UserButton />
        <UserButton />
      </UserMainInfo>
    </UserHeader>
  </UserPlaceholderContainer>
);

export default UsersPlaceholderItem;
