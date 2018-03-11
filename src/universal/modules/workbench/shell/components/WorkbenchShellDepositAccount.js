import React from 'react';
import styled from 'styled-components';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { FadeIn } from '../../../ui/transitions/';
import { Ellipsis } from 'gac-utils/sc';

const list = styled.ul`
  list-style: none;
`;

const Header = styled.h4`
  display: flex;
  align-items: center;
  font-size: 2.2rem;
  font-weight: 600;
  cursor: pointer;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: (0.75rem) (0);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #585858;
`;

const ListItemTitle = styled.span`
  display: flex;
  align-items: center;
  padding: (0.75rem) (0);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #585858;
`;

const ListItemTItle = styled.span`
  display: inline-block;
  min-width: 95px;
  color: ${props => props.theme.colors.black};
`;

const buildAccountPurpose = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <ListItem>
      <ListItemTItle>Purpose</ListItemTItle>
      <Ellipsis>{capitalizeString(data.accountPurpose, '_', ' ')}</Ellipsis>
    </ListItem>
  );
};

const buildAccountDetails = (data = {}) => {
  if (!Object.keys(data).length) return null;
  return (
    <span>
      <ListItem>
        <ListItemTItle>Transfer</ListItemTItle>
        <Ellipsis>{capitalizeString(data.interestTransfer, '_', ' ')}</Ellipsis>
      </ListItem>
      <ListItem>
        <ListItemTItle>Payout freq</ListItemTItle>
        <Ellipsis>{capitalizeString(data.payoutFrequency, '_', ' ')}</Ellipsis>
      </ListItem>
      <ListItem>
        <ListItemTItle>Term</ListItemTItle>
        <Ellipsis>{capitalizeString(data.termLength, '_', ' ')}</Ellipsis>
      </ListItem>
    </span>
  );
};

const buildTaxForms = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <span>
      <ListItem>
        <ListItemTItle>Tax</ListItemTItle>
        <Ellipsis>
          {data.canadianTaxPayer ? 'Canada ' : ''}
          {data.americanTaxPayer ? 'America ' : ''}
          {data.internationalTaxPayer ? 'International' : ''}
        </Ellipsis>
      </ListItem>
    </span>
  );
};

const buildThirdParty = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <ListItem>
      <ListItemTItle>Third party</ListItemTItle>
      <Ellipsis>{data.hasThirdParty ? 'Yes' : 'None'}</Ellipsis>
    </ListItem>
  );
};

const buildBeneficiaries = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <span>
      <ListItem>
        <ListItemTItle>Beneficiaries</ListItemTItle>
        <Ellipsis>{data.beneficiaries.length}</Ellipsis>
      </ListItem>
      <ul>
        {data.beneficiaries.map((ben, index) => (
          <ListItem key={ben.firstName + ben.lastName + index}>
            {`${index + 1}. `}
            {` ${ben.firstName}`}
            {` ${ben.lastName} – `}
            {ben.allocation * 100}%
          </ListItem>
        ))}
      </ul>
    </span>
  );
};

const buildMarketing = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <ListItem>
      <ListItemTItle>Marketing</ListItemTItle>
      {data && data.canContactForMarketing ? 'Agreed' : 'Has not agreed yet'}
    </ListItem>
  );
};

const WorkbenchShellDepositAccount = ({ workbench }) => {
  const { metadata, creator, isFetchingMetadata } = workbench;

  if (isFetchingMetadata) return null;

  /**
   * This is a quick fix to satisfy the needs of Zag Bank. Dennis will be
   * refactoring this sidebar deposit acocunt functionality to be much cleaner
   * in the near future. ✌️
   *
   * thanks
   */
  const metadataKeys = Object.keys(metadata);

  const formattedMetadata = metadataKeys.reduce((acc, next) => {
    if (Object.keys(metadata[next]).includes(creator.id)) {
      return Object.assign({}, acc, {
        [next]: metadata[next][creator.id],
      });
    }

    return Object.assign({}, acc, { [next]: metadata[next] });
  }, {});

  return (
    <FadeIn component="section">
      {isFetchingMetadata ? (
        <div />
      ) : (
        <div style={{ marginBottom: '3.375rem' }}>
          <Header>Deposit Account Details</Header>
          <List>
            {Object.keys(formattedMetadata).length ? (
              <span>
                {buildAccountPurpose(formattedMetadata.ACCOUNT_PURPOSE)}
                {buildAccountDetails(formattedMetadata.ACCOUNT_DETAILS)}
                {buildThirdParty(formattedMetadata.THIRD_PARTY)}
                {buildTaxForms(formattedMetadata.TAX_FORMS, creator.id)}
                {buildBeneficiaries(formattedMetadata.BENEFICIARIES)}
                {buildMarketing(formattedMetadata.MARKETING)}
              </span>
            ) : (
              <li>
                There is no data avaible for {creator.firstName}
                's application
              </li>
            )}
          </List>
        </div>
      )}
    </FadeIn>
  );
};

export default WorkbenchShellDepositAccount;
