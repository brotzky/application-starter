import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ChevronLeft } from '../../../ui/icons/';

const AccountShellHeaderContainer = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 ${props => (props.padding ? '3.375' : '0')}rem 4.5rem;
`;

const AccountShellHeaderHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AccountShellHeaderLinkBack = styled.div`
  cursor: pointer;
  display: flex;
  padding: 2px;
  border-radius: 3px;
  color: #262626;
  font-size: 1.6rem;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
  &:active {
    background: rgba(0, 0, 0, 0.15);
  }

  span,
  svg {
    position: relative;
    left: -5px;
  }
`;

const AccountShellHeaderHeading = styled.h1`
  font-size: 3.374rem;
`;

const AccountShellHeader = ({
  dispatch,
  text,
  showDelete,
  linkTo = {},
  linkBack = {},
  action,
  padding,
}) => (
  <AccountShellHeaderContainer padding={padding}>
    <AccountShellHeaderHeader>
      {linkBack.link && (
        <AccountShellHeaderLinkBack
          onClick={() => dispatch(push(linkBack.link))}
        >
          <ChevronLeft />
          <span>{linkBack.text}</span>
        </AccountShellHeaderLinkBack>
      )}
      <AccountShellHeaderHeading>{text}</AccountShellHeaderHeading>
    </AccountShellHeaderHeader>
    {action}
  </AccountShellHeaderContainer>
);

export default connect()(AccountShellHeader);
