import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { capitalizeString } from 'grow-utils/stringFormatting';

const BankAccountsControllerContainer = styled.div`
  color: #262626;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: 200ms ease-out all;
  width: 100%;

  &:hover {
    border-color: #448aff;
    background: rgba(68, 138, 255, 0.025);
  }
`;

const ControllerFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ControllerHeader = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
`;

const ControllerSubheader = styled.div`
  font-size: 1.3rem;
  opacity: 0.8;
  letter-spacing: 0.2px;
`;

const ControllerBankDetails = styled.div`
  margin-top: 1.5rem;
  display: flex;
`;

const ControllerBankDetailsColumn = styled.div`margin-right: 2.5rem;`;

const ControllerBankDetailsHeader = styled.div`
  font-size: 1.2rem;
  opacity: 0.7;
`;
const ControllerBankDetailsSubheader = styled.div`
  font-size: 1.6rem;
  color: #585858;
`;

const AccountToggle = styled.div`
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 30px;
  background: ${props => (props.isActive ? '#448aff' : '#d9d9d9')};

  &::after {
    height: 20px;
    width: 20px;
    position: absolute;
    content: '';
    top: 1px;
    right: -1px;
    background: white;
    border-radius: 50%;
    transition: all 240ms cubic-bezier(0.39, 0.575, 0.565, 1);
    will-change: transform;
    box-shadow: 0px 2px 6px 0px ${props => props.theme.colors.greyMid};
    transform: translateX(${props => (props.isActive ? '-2px' : '-20px')});
  }
`;

const BankAccountsController = ({ account, isActive, onClick }) => (
  <BankAccountsControllerContainer onClick={onClick}>
    <ControllerFlexContainer>
      <div>
        <ControllerHeader>{account.institutionName}</ControllerHeader>
        <ControllerSubheader>
          {capitalizeString(account.accountName, ' ', ' ')}
        </ControllerSubheader>
      </div>
      <AccountToggle isActive={isActive} />
    </ControllerFlexContainer>
    <ControllerFlexContainer>
      <ControllerBankDetails>
        <ControllerBankDetailsColumn>
          <ControllerBankDetailsHeader>
            Account Holder's Name
          </ControllerBankDetailsHeader>
          <ControllerBankDetailsSubheader>
            {capitalizeString(
              `${account.firstName} ${account.lastName}`,
              ' ',
              ' ',
            )}
          </ControllerBankDetailsSubheader>
        </ControllerBankDetailsColumn>
        <ControllerBankDetailsColumn>
          <ControllerBankDetailsHeader>Transit</ControllerBankDetailsHeader>
          <ControllerBankDetailsSubheader>
            {account.transitNumber}
          </ControllerBankDetailsSubheader>
        </ControllerBankDetailsColumn>
        <ControllerBankDetailsColumn>
          <ControllerBankDetailsHeader>Institution</ControllerBankDetailsHeader>
          <ControllerBankDetailsSubheader>
            {account.institutionNumber}
          </ControllerBankDetailsSubheader>
        </ControllerBankDetailsColumn>
        <ControllerBankDetailsColumn>
          <ControllerBankDetailsHeader>Account</ControllerBankDetailsHeader>
          <ControllerBankDetailsSubheader>
            {account.accountNumber}
          </ControllerBankDetailsSubheader>
        </ControllerBankDetailsColumn>
      </ControllerBankDetails>
      <ControllerBankDetails>
        <div style={{ textAlign: 'right' }}>
          <ControllerBankDetailsHeader>Balance</ControllerBankDetailsHeader>
          <ControllerBankDetailsSubheader>
            {numeral(account.balance).format('$0,0.00')}
          </ControllerBankDetailsSubheader>
        </div>
      </ControllerBankDetails>
    </ControllerFlexContainer>
  </BankAccountsControllerContainer>
);

export default BankAccountsController;
