import React from 'react';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { FadeIn } from '../../../ui/transitions/';

const buildAccountPurpose = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <li className="WorkbenchShellList__item">
      <span className="WorkbenchShellList__title">Purpose</span>
      <span className="WorkbenchShellList__detail">
        {capitalizeString(data.accountPurpose, '_', ' ')}
      </span>
    </li>
  );
};

const buildAccountDetails = (data = {}) => {
  if (!Object.keys(data).length) return null;
  return (
    <span>
      <li className="WorkbenchShellList__item">
        <span className="WorkbenchShellList__title">Transfer</span>
        <span className="WorkbenchShellList__detail">
          {capitalizeString(data.interestTransfer, '_', ' ')}
        </span>
      </li>
      <li className="WorkbenchShellList__item">
        <span className="WorkbenchShellList__title">Payout freq</span>
        <span className="WorkbenchShellList__detail">
          {capitalizeString(data.payoutFrequency, '_', ' ')}
        </span>
      </li>
      <li className="WorkbenchShellList__item">
        <span className="WorkbenchShellList__title">Term</span>
        <span className="WorkbenchShellList__detail">
          {capitalizeString(data.termLength, '_', ' ')}
        </span>
      </li>
    </span>
  );
};

const buildTaxForms = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <span>
      <li className="WorkbenchShellList__item">
        <span className="WorkbenchShellList__title">Tax</span>
        <span className="WorkbenchShellList__detail">
          {data.canadianTaxPayer ? 'Canada ' : ''}
          {data.americanTaxPayer ? 'America ' : ''}
          {data.internationalTaxPayer ? 'International' : ''}
        </span>
      </li>
    </span>
  );
};

const buildThirdParty = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <li className="WorkbenchShellList__item">
      <span className="WorkbenchShellList__title">Third party</span>
      <span className="WorkbenchShellList__detail">
        {data.hasThirdParty ? 'Yes' : 'None'}
      </span>
    </li>
  );
};

const buildBeneficiaries = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <span>
      <li className="WorkbenchShellList__item">
        <span className="WorkbenchShellList__title">Beneficiaries</span>
        <span className="WorkbenchShellList__detail">
          {data.beneficiaries.length}
        </span>
      </li>
      <ul className="WorkbenchShellList__item-list">
        {data.beneficiaries.map((ben, index) => (
          <li
            key={ben.firstName + ben.lastName + index}
            className="WorkbenchShellList__item"
          >
            {`${index + 1}. `}
            {` ${ben.firstName}`}
            {` ${ben.lastName} – `}
            {ben.allocation * 100}%
          </li>
        ))}
      </ul>
    </span>
  );
};

const buildMarketing = (data = {}) => {
  if (!Object.keys(data).length) return null;

  return (
    <li className="WorkbenchShellList__item">
      <span className="WorkbenchShellList__title">Marketing</span>
      {data && data.canContactForMarketing ? 'Agreed' : 'Has not agreed yet'}
    </li>
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
    <FadeIn className="WorkbenchShellSection" component="section">
      {isFetchingMetadata ? (
        <div />
      ) : (
        <div className="WorkbenchShellDepositAccount">
          <h6 className="WorkbenchShellHeader__heading">
            Deposit Account Details
          </h6>
          <ul className="WorkbenchShellList">
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
              <li className="WorkbenchShellList__item-single">
                There is no data avaible for {creator.firstName}
                's application
              </li>
            )}
          </ul>
        </div>
      )}
    </FadeIn>
  );
};

export default WorkbenchShellDepositAccount;
