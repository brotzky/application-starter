import React from 'react';
import styled from 'styled-components';

const ChecklistModalPlaceholderContent = styled.div`
  margin: 1.5rem auto 0;
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
`;

const ChecklistModalPlaceholderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChecklistModalPlaceholderCircle = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #efefef;
  margin-right: 30px;
`;

const ChecklistModalPlaceholderHeader = styled.div`
  height: 30px;
  width: 140px;
  background: #efefef;
  margin-bottom: ${props => (props.spacing ? '20px' : '0')};
`;

const ChecklistModalPlaceholderText = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  background: #efefef;
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const ChecklistModalPlaceholderSection = styled.div`
  padding-left: 10px;
  margin-bottom: 30px;
`;

const ChecklistDetailsPlaceholder = () => (
  <ChecklistModalPlaceholderRow style={{ marginBottom: '15px' }}>
    <ChecklistModalPlaceholderCircle />
    <ChecklistModalPlaceholderText height="20px" width="350px" />
    <ChecklistModalPlaceholderText height="20px" width="60px" />
  </ChecklistModalPlaceholderRow>
);

const ChecklistModalPlaceholder = () => (
  <ChecklistModalPlaceholderContent>
    <ChecklistModalPlaceholderSection>
      <ChecklistModalPlaceholderRow>
        <ChecklistModalPlaceholderCircle />
        <ChecklistModalPlaceholderHeader />
      </ChecklistModalPlaceholderRow>
    </ChecklistModalPlaceholderSection>

    <ChecklistModalPlaceholderSection>
      <ChecklistModalPlaceholderHeader spacing="true" />
      <ChecklistModalPlaceholderRow>
        <ChecklistModalPlaceholderCircle />
        <ChecklistModalPlaceholderText height="45px" width="450px" />
      </ChecklistModalPlaceholderRow>
    </ChecklistModalPlaceholderSection>

    <ChecklistModalPlaceholderSection>
      <ChecklistModalPlaceholderHeader spacing="true" />
      <ChecklistDetailsPlaceholder />
      <ChecklistDetailsPlaceholder />
      <ChecklistDetailsPlaceholder />
    </ChecklistModalPlaceholderSection>
  </ChecklistModalPlaceholderContent>
);

export default ChecklistModalPlaceholder;
