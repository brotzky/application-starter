import React from 'react';
import numeral from 'numeral';

const getSelectedQuote = (offers, selectedTerm) => offers.filter(offer => offer.term === selectedTerm)[0];

const WorkbenchShellQuote = ({ workbench }) => {
  const { quote, creator } = workbench;
  const yearsAndMonths = quote
    ? `${Math.floor(quote.selectedTerm / 12)} yrs ${quote.selectedTerm % 12} mo`
    : null;

  return (
    <section className="WorkbenchShellSection">
      <div className="WorkbenchShellQuote">
        <h6 className="WorkbenchShellHeader__heading">Loan Details</h6>
        <ul className="WorkbenchShellList">
          {quote ? (
            <span>
              <li className="WorkbenchShellList__item">
                <span className="WorkbenchShellList__title">Status</span>{' '}
                {quote.quoteState}
              </li>
              {quote.quoteState === 'Accepted' ? (
                <span>
                  <li className="WorkbenchShellList__item">
                    <span className="WorkbenchShellList__title">
                      Amount
                    </span>{' '}
                    {numeral(quote.loanAmount).format('$0,0.00')}
                  </li>
                  <li className="WorkbenchShellList__item">
                    <span className="WorkbenchShellList__title">
                      Payment
                    </span>{' '}
                    {numeral(
                      getSelectedQuote(quote.offers, quote.selectedTerm)
                        .monthlyPayment,
                    ).format('$0,0.00')}
                    /mo
                  </li>
                  <li className="WorkbenchShellList__item">
                    <span className="WorkbenchShellList__title">Term</span>{' '}
                    {`${quote.selectedTerm} months (${yearsAndMonths})`}
                  </li>
                  <li className="WorkbenchShellList__item">
                    <span className="WorkbenchShellList__title">APR</span>{' '}
                    {numeral(
                      getSelectedQuote(quote.offers, quote.selectedTerm).apr,
                    ).format('0.00%')}
                  </li>
                </span>
              ) : null}
              <li className="WorkbenchShellList__item">
                <span className="WorkbenchShellList__title">
                  Qualified
                </span>{' '}
                {numeral(quote.minAmount).format('$0,0.00')} -{' '}
                {numeral(quote.maxAmount).format('$0,0.00')}
              </li>
              <li className="WorkbenchShellList__item">
                <span className="WorkbenchShellList__title">Purpose</span>{' '}
                {quote.loanPurpose}
              </li>
            </span>
          ) : (
            <li className="WorkbenchShellList__item-single">
              {creator.firstName} has not accepted a Personal Loan.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default WorkbenchShellQuote;
