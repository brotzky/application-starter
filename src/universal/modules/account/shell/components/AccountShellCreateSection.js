import React from 'react';
import styled from 'styled-components';

const AccountShellCreateSectionContainer = styled.div`
  display: flex;
  border-top: 1px solid #dee4e7;
  justify-content: space-between;
  padding: 2.25rem 3.375rem 4.5rem;
`;

const AccountShellCreateSectionLeft = styled.div`flex: 0.45;`;

const AccountShellCreateSectionRight = styled.div`flex: 0.55;`;

const AccountShellCreateSectionHeader = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1rem 0;
`;

const AccountShellCreateSectionText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  opacity: 0.6;
  padding-right: 20%;
`;

/**
 * <AccountShellCreateSection />
 * 
 */
const AccountShellCreateSection = ({ children, header, text }) => {
  return (
    <AccountShellCreateSectionContainer>
      <AccountShellCreateSectionLeft>
        <AccountShellCreateSectionHeader>
          {header}
        </AccountShellCreateSectionHeader>
        <AccountShellCreateSectionText>{text}</AccountShellCreateSectionText>
      </AccountShellCreateSectionLeft>
      <AccountShellCreateSectionRight>
        {children}
      </AccountShellCreateSectionRight>
    </AccountShellCreateSectionContainer>
  );
};

export default AccountShellCreateSection;
