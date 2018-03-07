import React from 'react';
import moment from 'moment';
import { EmptyState } from '../../../ui/components';
import { Applications } from '../../../ui/icons';

const rendeLoanAgreementEmptyState = props => {
  if (props.errors.includes('NO_PERMISSION')) {
    return <EmptyState errors={props.errors} />;
  }

  if (!props.isFetching) {
    return (
      <EmptyState
        Icon={Applications}
        text="Loan Agreement unavailable"
        errors={props.errors}
      />
    );
  }
};
const LoanBookLoanAgreement = props => {
  const { loanAgreement } = props;

  return (
    <div className="Member__box Member__box--ofh">
      <header className="QueueHeader">
        <ul className="QueueList QueueHeader__list">
          <li className="QueueItem QueueHeader__item">
            <ul className="QueueItem__wrapper QueueHeader__item-wrapper">
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">Date Created</span>
              </li>
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">Date Signed</span>
              </li>
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">State</span>
              </li>
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">Effective Date</span>
              </li>
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">Funding Date</span>
              </li>
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">First Payment Date</span>
              </li>
              <li className="QueueItem__cell">
                <span className="QueueItem__heading">Last Payment Date</span>
              </li>
            </ul>
          </li>
        </ul>
      </header>
      {!loanAgreement ? (
        rendeLoanAgreementEmptyState(props)
      ) : (
        <ul className="QueueList">
          <li className="QueueItem">
            <ul className="QueueItem__wrapper">
              <li className="QueueItem__cell">
                {moment(loanAgreement.dateCreated).format('MMM D YYYY, h:mm a')}
              </li>
              <li className="QueueItem__cell">
                {moment(loanAgreement.dateSigned).format('MMM D YYYY, h:mm a')}
              </li>
              <li className="QueueItem__cell">
                {loanAgreement.loanAgreementState}
              </li>
              <li className="QueueItem__cell">
                {loanAgreement.effectiveYear}-{loanAgreement.effectiveMonth}-{loanAgreement.effectiveDay}
              </li>
              <li className="QueueItem__cell">
                {loanAgreement.fundingYear}-{loanAgreement.fundingMonth}-{loanAgreement.fundingDay}
              </li>
              <li className="QueueItem__cell">
                {loanAgreement.firstPaymentYear}-{loanAgreement.firstPaymentMonth}-{loanAgreement.firstPaymentDay}
              </li>
              <li className="QueueItem__cell">
                {loanAgreement.lastPaymentYear}-{loanAgreement.lastPaymentMonth}-{loanAgreement.lastPaymentDay}
              </li>
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoanBookLoanAgreement;
