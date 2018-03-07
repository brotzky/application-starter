import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-dom';
import moment from 'moment';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { rolePropType } from 'gac-utils/proptypes';

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
    min-width: 165px;
    max-width: 200px;
  }

  &:nth-of-type(2) {
    min-width: 232px;
    max-width: 267px;
  }

  &:nth-of-type(3),
  &:last-of-type {
    width: 330px;
  }
`;

const RolesItem = ({ dispatch, role }) => {
  const { name, description, id, dateCreated, dateModified } = role;
  const modified = moment(dateModified).format('MMM D YYYY, h:mm a');
  const created = moment(dateCreated).format('MMM D YYYY, h:mm a');
  const roleLink = `/account/role/${id}`;

  return (
    <UserList onClick={() => dispatch(push(roleLink))}>
      <UserListItem title={name}>
        <div>{capitalizeString(name, ' ', ' ')}</div>
      </UserListItem>
      <UserListItem title={description}>
        <div>{description}</div>
      </UserListItem>
      <UserListItem title={modified}>
        <div>{modified}</div>
      </UserListItem>
      <UserListItem title={created}>
        <div>{created}</div>
      </UserListItem>
    </UserList>
  );
};

RolesItem.propTypes = {
  role: rolePropType.isRequired,
};

export default connect()(RolesItem);
