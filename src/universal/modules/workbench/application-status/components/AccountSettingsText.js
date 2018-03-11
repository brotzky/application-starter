import React from 'react';
import styled from 'styled-components';

const AccountSettingsTextWrapper = styled.div`
  margin: 1rem 3rem;
`;

const AccountSettingsTextHeader = styled.h4`
  font-size: ${props => props.theme.font.size2};
`;

const AccountSettingsTextSubheader = styled.p`
  opacity: 0.75;
  margin: 4px 0 0;
  font-size: 1.4rem;
`;

export const AccountSettingsText = ({ header, subheader, showSubheader }) => {
  return (
    <AccountSettingsTextWrapper>
      <AccountSettingsTextHeader>{header}</AccountSettingsTextHeader>
      {!showSubheader && (
        <AccountSettingsTextSubheader>{subheader}</AccountSettingsTextSubheader>
      )}
    </AccountSettingsTextWrapper>
  );
};

export default AccountSettingsText;
