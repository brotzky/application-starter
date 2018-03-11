import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { userPropType } from 'gac-utils/proptypes';
import { sendUserInvite } from 'grow-actions/user/user';
import { Button, ProfilePicture } from '../../../ui/components';
import UsersDeactivate from '../../users/components/UsersDeactivate';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions';

const UserItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 0;
  border-bottom: 1px solid #efefef;
  width: 100%;
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserMainInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserButtons = styled.div`
  display: flex;
  > div:nth-child(2) {
    margin-left: 15px;
  }
`;

const UserProfilePicture = styled.div`
  margin-right: 20px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 3px;
`;

const UserEmail = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.55;
  font-weight: 500;
`;

const UserDetailsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 1.4rem;

  svg {
    margin-left: 5px;
    path {
      fill: #585858;
    }
  }
`;

const PendingStatus = styled.div`
  text-transform: uppercase;
  color: #7b8b9a;
  border: 1px solid #c1cdd8;
  background-color: #f0f4f7;
  border-radius: 20px;
  padding: 2px 6px 0 6px;
  width: 70px;
  height: 20px;
  margin-left: 15px;
  text-align: center;
  font-size: 10px;
`;

const Complete = () => (
  <svg
    aria-hidden="true"
    height="16"
    version="1.1"
    viewBox="0 0 12 16"
    width="12"
  >
    <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z" />
  </svg>
);

const Incomplete = () => (
  <svg
    aria-hidden="true"
    height="16"
    version="1.1"
    viewBox="0 0 12 16"
    width="12"
  >
    <path
      fillule="evenodd"
      d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"
    />
  </svg>
);

const UsersItem = ({ user, dispatch }) => {
  const profileLink = `/account/profile/${user.id}`;
  const roles = user.role.map((item, index) => (
    <span key={item}>
      {index ? ', ' : ''}
      {capitalizeString(item, ' ', ' ')}
    </span>
  ));
  const isUserAccepted = user.auth0InviteStatus === 'ACCEPTED';
  const userPassword = isUserAccepted ? <Complete /> : <Incomplete />;
  const user2FA = user.auth0MfaEnabled ? <Complete /> : <Incomplete />;

  const pendingStatus =
    user.auth0InviteStatus === 'INVITED' ? (
      <PendingStatus>Pending</PendingStatus>
    ) : null;
  const handleInvite = user => {
    dispatch(
      notificationPush({
        id: user.email,
        kind: 'loading',
        message: `Sending invite to ${user.firstName}...`,
      }),
    );
    dispatch(
      sendUserInvite({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role[0],
      }),
    ).then(response => {
      dispatch(
        notificationEdit({
          id: user.email,
          kind: response.payload.error ? 'error' : 'success',
          message: response.payload.error
            ? `Error sending invite.`
            : `${user.firstName} has been sent an invite.`,
          dismissAfter: 5000,
        }),
      );
    });
  };

  return (
    <UserItemContainer>
      <UserHeader>
        <UserMainInfo>
          <UserProfilePicture>
            <ProfilePicture size={66} user={user} />
          </UserProfilePicture>
          <div>
            <UserName>
              {`${user.firstName} ${user.lastName}`}
              {pendingStatus}
            </UserName>
            <UserEmail>{user.email}</UserEmail>
            <UserDetails>
              <UserDetailsItem>
                Role {user.role[0].toLowerCase()}
              </UserDetailsItem>
              <UserDetailsItem>–</UserDetailsItem>
              <UserDetailsItem>Password {userPassword}</UserDetailsItem>
              <UserDetailsItem>
                2FA
                {user2FA}
              </UserDetailsItem>
            </UserDetails>
          </div>
        </UserMainInfo>
        <UserButtons>
          <Button
            text="Edit"
            appearance="default"
            size="small"
            onClick={() => dispatch(push(profileLink))}
          />
          {isUserAccepted ? (
            <UsersDeactivate
              dispatch={dispatch}
              currentUser={user}
              size="small"
            />
          ) : (
            <Button
              text="Resend"
              size="small"
              onClick={() => handleInvite(user)}
            />
          )}
        </UserButtons>
      </UserHeader>
    </UserItemContainer>
  );
};

UsersItem.propTypes = {
  user: userPropType.isRequired,
};

export default connect()(UsersItem);
