import React, { Component } from 'react';
import styled from 'styled-components';
import { Card } from '../../ui/components';

/**
 * A user profile card to display primary information and metadata.
 */
const ProfileCard = styled(Card)`
  height: 100%;
  width: 100%;
  box-shadow: 0;
  box-shadow: none;
`;

const ProfileCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.alignItems};
  height: 60px;
  justify-content: space-between;
  padding: 0 12px;
  width: 100%;
  ${props =>
    props.bordered &&
    `
    padding-bottom: 8px;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  `};
`;

const ProfileCardHeader = styled.span`
  text-transform: uppercase;
  font-size: 12px;
  display: block;
  font-weight: 500;
  opacity: 0.4;
  ${props => props.right && `text-align: right;`};
`;

const ProfileCardSub = styled.span`
  display: block;
  font-size: 13px;
  ${props => props.right && `text-align: right;`};
`;

ProfileCard.Row = ProfileCardRow;
ProfileCard.Header = ProfileCardHeader;
ProfileCard.Sub = ProfileCardSub;
export default ProfileCard;
