import React from 'react';
import styled from 'styled-components';

const UsersCreateSection = styled.div`flex: 0.5;`;

const UsersCreateSectionHeader = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1.2rem 0 1.6rem;
`;

const UsersCreateSectionText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  opacity: 0.6;
  padding-right: 20%;
`;

const UsersCreateTitle = ({ header, text }) => {
  return (
    <UsersCreateSection>
      <UsersCreateSectionHeader>{header}</UsersCreateSectionHeader>
      <UsersCreateSectionText>{text}</UsersCreateSectionText>
    </UsersCreateSection>
  );
};

export default UsersCreateTitle;
