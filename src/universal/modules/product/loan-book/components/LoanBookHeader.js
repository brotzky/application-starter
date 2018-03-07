import React from 'react';
import numeral from 'numeral';
import LoanBookBalance from './LoanBookBalance';
import { capitalizeString, niceTerm } from 'grow-utils/stringFormatting';
import { FadeIn } from '../../../ui/transitions';
import { EmptyState } from '../../../ui/components';
import { Wallet } from '../../../ui/icons';

const loanBookLoadingState = props => {
  if (props.errors.includes('NO_PERMISSION')) {
    return <EmptyState errors={props.errors} />;
  }

  return (
    <div>
      <div className="LoanBookHeaderPlaceholder__heading" />
      <div className="LoanBookHeader__middle">
        <div className="LoanBookHeaderPlaceholder__snippet" />
        <div className="LoanBookHeaderPlaceholder__snippet" />
        <div className="LoanBookHeaderPlaceholder__snippet" />
      </div>
    </div>
  );
};

const LoanBookHeader = props => {
  const {
    air,
    asOfBalance,
    asOfDate,
    dispatch,
    isFetching,
    params,
    principal,
    term,
  } = props;

  return (
    <header className="LoanBookHeader">
      <div className="LoanBookHeader__top">
        <h2 className="LoanBookHeader__heading">
          <Wallet className="LoanBookHeader__heading-icon" />
          {capitalizeString(params.productCategory, '_', ' ')}
        </h2>
      </div>
      {asOfDate && !isFetching ? (
        <FadeIn>
          <div>
            <LoanBookBalance
              asOfDate={asOfDate}
              asOfBalance={asOfBalance}
              dispatch={dispatch}
              isFetching={isFetching}
              params={params}
            />
            <div className="LoanBookHeader__middle">
              <div className="LoanBookHeader__snippet">
                <p className="LoanBookHeader__snippet-value">
                  {numeral(principal).format('$0,00.00')}
                </p>
                <p className="LoanBookHeader__snippet-label">Principal</p>
              </div>
              <div className="LoanBookHeader__snippet">
                <p className="LoanBookHeader__snippet-value">
                  {`${niceTerm(term)}`} <small>({term} mo)</small>
                </p>
                <p className="LoanBookHeader__snippet-label">Term</p>
              </div>
              <div className="LoanBookHeader__snippet">
                <p className="LoanBookHeader__snippet-value">
                  {numeral(air).format('0.00%')}
                </p>
                <p className="LoanBookHeader__snippet-label">
                  Annual Interest Rate
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      ) : (
        loanBookLoadingState(props)
      )}
    </header>
  );
};

export default LoanBookHeader;
