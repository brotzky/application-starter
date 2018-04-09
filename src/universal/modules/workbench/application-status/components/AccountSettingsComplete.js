import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const AccountSettingsCompleteContainer = styled.div`
  display: flex;
  align-items: center;

  & > div,
  svg {
    margin: 13px;
  }
`;

const AccountSettingsCompleteWrapper = styled.div`
  color: ${props => props.theme.colors.black};
  margin-left: 10px;
`;

const AccountSettingsCompleteTop = styled.div`
  position: relative;
  font-size: 1.5rem;
  font-weight: 600;
`;

const AccountSettingsCompleteSub = styled.div`
  position: relative;
  bottom: 1px;
  font-size: 1.4rem;
  opacity: 0.75;
  margin: 2px 0 0;
`;

export const AccountSettingsComplete = ({ data, header }) => {
  const { proceedAudit: { firstName, lastName, date, automated } } = data;

  return (
    <AccountSettingsCompleteContainer>
      <AccountSettingsCompleteWrapper>
        <AccountSettingsCompleteTop>{header}</AccountSettingsCompleteTop>
        {automated === 'false' ? (
          <AccountSettingsCompleteSub>
            Completed by {firstName} {lastName} {moment(date).fromNow()}
          </AccountSettingsCompleteSub>
        ) : (
          <AccountSettingsCompleteSub>
            Completed automatically {moment(date).fromNow()}
          </AccountSettingsCompleteSub>
        )}
      </AccountSettingsCompleteWrapper>
    </AccountSettingsCompleteContainer>
  );
};

export default AccountSettingsComplete;
