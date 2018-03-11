import React from 'react';
import styled from 'styled-components';
import { User } from '../../ui/icons/';

const PlaceholderWrapper = styled.div`
  list-style-type: none;
  margin-bottom: 1.6rem;
`;

const NotesItem = styled.div`
  overflow: auto;
  disply: flex;
  justify-content: space-between;
  padding: 0 4rem;
`;

const Icon = styled(User)`
  vertical-align: bottom;
  position: relative;

  * {
    stroke: ${props => props.theme.colors.greyMid};
  }
`;

const Body = styled.div`
  border-radius: 2px;
  position: relative;
  margin: 0 6rem;
  height: 200px;
  border: 1px solid #eee;
  background: ${props => props.theme.colors.greyWhite};
`;

const MemberNotesPlaceholder = () => (
  <PlaceholderWrapper>
    <NotesItem>
      <Icon />
      <Body />
    </NotesItem>
  </PlaceholderWrapper>
);

export default MemberNotesPlaceholder;
