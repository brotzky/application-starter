import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { getLoanBookAmortization } from 'grow-actions/loan-book/loan-book';
import Pagination from '../../../ui/pagination/containers/Pagination';
import { ChevronLeft, ChevronRight, CircleCross } from '../../../ui/icons/';
import { EmptyState } from '../../../ui/components';

class LoanBookAmortization extends Component {
  componentWillMount() {
    const { params, updateData } = this.props;
    return updateData(
      {
        itemsPerPage: 10,
        queryParams: {
          start: 0,
          end: 10,
        },
        page: 1,
      },
      params.productId,
    );
  }

  renderloanBookAmortizationList() {
    const { data: loanBookAmortization } = this.props;
    if (loanBookAmortization.errors.includes('NO_PERMISSION')) {
      return <EmptyState errors={loanBookAmortization.errors} />;
    }

    return (
      <ul className="QueueList">
        {loanBookAmortization.amortization.map(am => (
          <li key={am.date} className="QueueItem">
            <ul className="QueueItem__wrapper">
              <li className="QueueItem__cell">{am.period}</li>
              <li className="QueueItem__cell">
                {moment(
                  am.utcDateTime.substring(0, 10).replace(/\//g, '-'),
                ).format('YYYY-MM-DD')}
              </li>
              <li className="QueueItem__cell">{am.amortizationRowType}</li>
              <li className="QueueItem__cell">
                {numeral(am.openingBalance).format('$0,00.00')}
              </li>
              <li className="QueueItem__cell">
                {numeral(am.paymentAmount).format('$0,00.00')}
              </li>
              <li className="QueueItem__cell">
                {numeral(am.interestCharged).format('$0,00.00')}
              </li>
              <li className="QueueItem__cell">
                {numeral(am.accruedInterest).format('$0,00.00')}
              </li>
              <li className="QueueItem__cell">
                {numeral(am.closingBalance).format('$0,00.00')}
              </li>
              <li className="QueueItem__cell">
                {numeral(am.principalBalance).format('$0,00.00')}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      handlePagination,
      hasMoreResults,
      data: loanBookAmortization,
      params,
    } = this.props;
    return (
      <div className="Member__box Member__box--ofh">
        <header className="QueueHeader">
          <ul className="QueueList QueueHeader__list">
            <li className="QueueItem QueueHeader__item">
              <ul className="QueueItem__wrapper QueueHeader__item-wrapper">
                {/* <li className="QueueItem__cell"><span className="QueueItem__heading">Row</span></li> */}
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Period</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Date</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Type</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Opening</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Payments</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Int. Charged</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Acc. Int.</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Closing</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Principal</span>
                </li>
              </ul>
            </li>
          </ul>
        </header>
        {loanBookAmortization.isFetching ? (
          <div className="QueuePlaceholder" />
        ) : (
          this.renderloanBookAmortizationList()
        )}
        <div className="CashflowTransactionsControls">
          <div>
            <span>Page {loanBookAmortization.page}</span>
          </div>
          <div>
            <button
              disabled={
                loanBookAmortization.isFetching || !hasMoreResults('previous')
              }
              className="QueuePagination__button"
              type="button"
              onClick={() => handlePagination('previous', params.productId)}
            >
              <ChevronLeft className="QueuePagination__button-icon" />
            </button>
            <button
              disabled={
                loanBookAmortization.isFetching || !hasMoreResults('next')
              }
              className="QueuePagination__button"
              type="button"
              onClick={() => handlePagination('next', params.productId)}
            >
              <ChevronRight className="QueuePagination__button-icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product.loanBookAmortization,
});

LoanBookAmortization = Pagination({
  fetchDataAction: getLoanBookAmortization,
  name: 'loan-book-amortization',
})(LoanBookAmortization);

export default connect(mapStateToProps)(LoanBookAmortization);
