import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { SecondaryNavListItem } from 'gac-utils/sc';

const StyledLink = styled(NavLink)`
  display: block;
  position: relative;
  padding: 0 1rem;
  margin: 0 1.8rem;
  height: 50px;
  line-height: 48px;
  border-bottom: 2px solid transparent;
  color: #777;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;

const activeStyle = {
  borderColor: '#448aff',
  color: '#262626',
};

const SecondaryNavMember = ({ member }) => {
  return (
    <SecondaryNavListItem>
      <StyledLink
        exact
        activeStyle={activeStyle}
        to={`/members/${member.member.id}/`}
      >
        {member.member.firstName} {member.member.lastName}
      </StyledLink>
    </SecondaryNavListItem>
  );
};

export default SecondaryNavMember;
