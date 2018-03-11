import React from 'react';
import styled, { css } from 'styled-components';
import { FadeIn } from '../../../ui/transitions';

const AccountSettingsSection = styled.div`
  margin-bottom: 4.2rem;
  position: relative;
  transition: all 300ms ease;
  background: white;

  &:last-child {
    margin-bottom: 0;
  }
`;

const active = css`
  transition: all 300ms ease;
  border-color: ${props => props.theme.colors.blue};
  background: #fdfeff;
`;
const disabled = css`
  transition: all 300ms ease;
  background: #fafafa;
`;

const AccountSettingsSectionInner = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  border: 1px solid #e5e5e5;
  border-radius: 2px;

  ${props => (props.isCurrent ? active : props.isComplete ? '' : disabled)};
`;

const AccountSettingsItem = props => {
  const { isCurrent, isComplete, children } = props;

  return (
    <AccountSettingsSection>
      <FadeIn>
        <AccountSettingsSectionInner
          isCurrent={isCurrent}
          isComplete={isComplete}
        >
          {children}
        </AccountSettingsSectionInner>
      </FadeIn>
    </AccountSettingsSection>
  );
};

export default AccountSettingsItem;
