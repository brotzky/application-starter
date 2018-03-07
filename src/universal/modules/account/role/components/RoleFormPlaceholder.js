import React from 'react';
import styled from 'styled-components';

const RoleFormPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 15px;
  border-top: 1px solid #dee4e7;
  padding: 2.25rem 0 5rem;
`;

const RoleFormPlaceholderInput = styled.div`
  height: 39px;
  margin-bottom: ${props => (props.noMargin ? '0' : '36px')};
  width: 55%;
  background: rgba(0, 0, 0, 0.04);
`;

const RoleFormPlaceholder = () => (
  <div>
    <RoleFormPlaceholderContainer>
      <RoleFormPlaceholderInput />
      <RoleFormPlaceholderInput noMargin />
    </RoleFormPlaceholderContainer>
    <RoleFormPlaceholderContainer>
      <RoleFormPlaceholderInput />
      <RoleFormPlaceholderInput noMargin />
    </RoleFormPlaceholderContainer>
  </div>
);

export default RoleFormPlaceholder;
