import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TriangleUp } from '../../../ui/icons/';

const TableRow = styled.tr`cursor: pointer;`;

const TableHeader = styled.th`
  font-weight: 500;
  text-align: left;
  color: color(black);
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

const Head = styled.thead`width: 100%;`;

const RolesListHeader = ({ activeSort, sortByAsc, handleClick }) => (
  <Head>
    <TableRow>
      <TableHeader onClick={handleClick}>
        <span data-sortname="name">Role</span>
        {activeSort === 'name' && <StyledTriangleUp sortByAsc={sortByAsc} />}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="description">Description</span>
        {activeSort === 'description' && (
          <StyledTriangleUp sortByAsc={sortByAsc} />
        )}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="dateModified">Last Modified</span>
        {activeSort === 'dateModified' && (
          <StyledTriangleUp sortByAsc={sortByAsc} />
        )}
      </TableHeader>
      <TableHeader onClick={handleClick}>
        <span data-sortname="dateCreated">Created</span>
        {activeSort === 'dateCreated' && (
          <StyledTriangleUp sortByAsc={sortByAsc} />
        )}
      </TableHeader>
    </TableRow>
  </Head>
);

RolesListHeader.propTypes = {
  activeSort: PropTypes.string.isRequired,
  sortByAsc: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default RolesListHeader;
