import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TriangleUp } from '../../../ui/icons/';

const TableRow = styled.tr`
  cursor: pointer;
`;

const TableHeader = styled.th`
  font-weight: 500;
  text-align: left;
  color: ${props => props.theme.colors.black};
  padding: 13px 15px;
  user-select: none;
  border-bottom: 1px solid #ebeef0;
  background: transparent;
  span {
    padding: 15px 10px 15px 0;
  }

  &:hover {
    background: ${props => props.theme.colors.greyLight};
  }
`;

const StyledTriangleUp = styled(TriangleUp)`
  width: 12px;
  height: 12px;
  position: relative;
  bottom: ${props => (props.sortByAsc ? '4px' : '-1px')};
  transform: ${props => (props.sortByAsc ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Head = styled.thead`
  width: 100%;
`;

const UsersListHeader = ({ activeSort, sortByAsc, handleClick }) => (
  <Head>
    <TableRow>
      <TableHeader onClick={handleClick}>
        <span data-sortname="firstName">Name</span>
        {activeSort === 'firstName' && (
          <StyledTriangleUp sortByAsc={sortByAsc} />
        )}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="email">Email</span>
        {activeSort === 'email' && <StyledTriangleUp sortByAsc={sortByAsc} />}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="dateCreated">Joined</span>
        {activeSort === 'dateCreated' && (
          <StyledTriangleUp sortByAsc={sortByAsc} />
        )}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="role">Role</span>
        {activeSort === 'role' && <StyledTriangleUp sortByAsc={sortByAsc} />}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="auth0MfaEnabled">2FA</span>
        {activeSort === 'auth0MfaEnabled' && (
          <StyledTriangleUp sortByAsc={sortByAsc} />
        )}
      </TableHeader>
    </TableRow>
  </Head>
);

UsersListHeader.propTypes = {
  activeSort: PropTypes.string.isRequired,
  sortByAsc: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default UsersListHeader;
