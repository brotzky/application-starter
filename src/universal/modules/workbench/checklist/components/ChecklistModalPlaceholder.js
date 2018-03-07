import React from 'react';
import styled from 'styled-components';

const ChecklistModalPlaceholderContent = styled.div`
  margin: 1.5rem auto 0;
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
`;

const ChecklistModalPlaceholderHeader = styled.div`
  height: 20px;
  width: 355px;
  background: #efefef;
  margin: 0 auto 2rem;
`;

const ChecklistModalPlaceholderTextarea = styled.div`
  height: 120px;
  width: 355px;
  background: #efefef;
  margin: 0 auto 1.8rem;
`;

const ChecklistModalPlaceholderButton = styled.div`
  height: 35px;
  width: 120px;
  background: #efefef;
  margin: 0 auto;
`;

const ChecklistModalPlaceholder = () => (
  <ChecklistModalPlaceholderContent>
    <ChecklistModalPlaceholderHeader />
    <ChecklistModalPlaceholderTextarea />
    <ChecklistModalPlaceholderButton />
  </ChecklistModalPlaceholderContent>
);

export default ChecklistModalPlaceholder;
