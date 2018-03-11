import React from 'react';
import styled from 'styled-components';
import { ease } from 'gac-utils/sc';

const PrimaryNavSignoutButton = styled.button`
  height: 1.6rem;
  padding: 1.92rem;
  text-transform: uppercase;
  font-weight: 600;
  color: ${props => props.theme.colors.greyMidDark};
  border-radius: 4px;
  font-size: ${props => props.theme.font.size1};
  background: white;
  ${ease('out')};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PrimaryNavSignout = ({ onClick }) => (
  <PrimaryNavSignoutButton onClick={onClick}>Log out</PrimaryNavSignoutButton>
);

export default PrimaryNavSignout;
