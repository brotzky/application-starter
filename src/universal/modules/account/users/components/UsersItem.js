import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { capitalizeString } from 'grow-utils/stringFormatting';
import moment from 'moment';
import { userPropType } from 'gac-utils/proptypes';

const UserList = styled.tr`
  transition: 200ms ease all;
  font-size: 1.4rem;

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.045);
  }

  &:last-child {
    td {
      border: none;
    }
  }
`;

const UserListItem = styled.td`
  color: ${props => props.theme.colors.greyVeryDark};
  padding: 10px 16px;
  user-select: none;
  border-bottom: 1px solid #ebeef0;
  vertical-align: top;

  > div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:first-of-type {
    max-width: 160px;
  }

  &:nth-of-type(2) {
    max-width: 200px;
  }

  &:nth-of-type(3) {
    width: 150px;
  }

  &:nth-of-type(4) {
    width: 110px;
  }

  &:last-of-type {
    min-width: 90px;
    max-width: 100px;
  }
`;

const UsersItem = ({ user }) => {
  const profileLink = `/account/profile/${user.id}`;
  const roles = user.role.map((item, index) => (
    <span key={item}>
      {index ? ', ' : ''}
      {capitalizeString(item, ' ', ' ')}
    </span>
  ));
  const twoFactorEnabled = user.auth0MfaEnabled ? 'enabled' : 'disabled';

  return (
    <UserList onClick={() => dispatch(push(profileLink))}>
      <UserListItem title={`${user.firstName} ${user.lastName}`}>
        <div>{`${user.firstName} ${user.lastName}`}</div>
      </UserListItem>
      <UserListItem title={user.email}>
        <div>{user.email}</div>
      </UserListItem>
      <UserListItem>
        <div>{moment(user.dateCreated).format('MMM D YYYY, h:mm a')}</div>
      </UserListItem>
      <UserListItem title={roles}>
        <div>{roles}</div>
      </UserListItem>
      <UserListItem title="2FA">
        <div>{twoFactorEnabled}</div>
      </UserListItem>
    </UserList>
  );
};

UsersItem.propTypes = {
  user: userPropType.isRequired,
};

export default connect()(UsersItem);
