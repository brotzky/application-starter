import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import Pagination from '../../../ui/pagination/containers/Pagination';
import { getLoanBookTransactions } from 'grow-actions/loan-book/loan-book';
import { ChevronLeft, ChevronRight } from '../../../ui/icons/';
import { EmptyState } from '../../../ui/components';

class LoanBookTransactions extends Component {
  componentWillMount() {
    const { params, updateData } = this.props;
    return updateData(
      {
        queryParams: {
          start: 0,
          end: 10,
        },
      },
      params.productId,
    );
  }

  renderloanBookTransactionsList() {
    const { data: loanBookTransactions } = this.props;

    if (loanBookTransactions.errors.includes('NO_PERMISSION')) {
      return <EmptyState errors={loanBookTransactions.errors} />;
    }

    return (
      <ul className="QueueList">
        {loanBookTransactions.transactions.map(transaction => {
          return (
            <li key={transaction.id} className="QueueItem">
              <ul className="QueueItem__wrapper">
                <li className="QueueItem__cell">
                  {moment(
                    transaction.utcDateTime
                      .substring(0, 10)
                      .replace(/\//g, '-'),
                  ).format('YYYY-MM-DD')}
                </li>
                <li className="QueueItem__cell">
                  {numeral(transaction.amount).format('$0,00.00')}
                </li>
                <li className="QueueItem__cell">
                  {transaction.transactionType}
                </li>
                <li className="QueueItem__cell">
                  {transaction.payments.map(payment => <span>{payment},</span>)}
                </li>
                <li className="QueueItem__cell" title={transaction.comment}>
                  {transaction.comment}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const {
      handlePagination,
      hasMoreResults,
      data: loanBookTransactions,
      params,
    } = this.props;
    return (
      <div className="Member__box Member__box--ofh">
        <header className="QueueHeader">
          <ul className="QueueList QueueHeader__list">
            <li className="QueueItem QueueHeader__item">
              <ul className="QueueItem__wrapper QueueHeader__item-wrapper">
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Transaction Ledger</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Amount</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Type</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Scheduled Payment</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Comment</span>
                </li>
              </ul>
            </li>
          </ul>
        </header>
        {loanBookTransactions.isFetching ? (
          <div className="QueuePlaceholder" />
        ) : (
          this.renderloanBookTransactionsList()
        )}
        <div className="CashflowTransactionsControls">
          <div>
            <span>Page {loanBookTransactions.page}</span>
          </div>
          <div>
            <button
              disabled={
                loanBookTransactions.isFetching || !hasMoreResults('previous')
              }
              className="QueuePagination__button"
              type="button"
              onClick={() => handlePagination('previous', params.productId)}
            >
              <ChevronLeft className="QueuePagination__button-icon" />
            </button>
            <button
              disabled={
                loanBookTransactions.isFetching || !hasMoreResults('next')
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
  data: state.product.loanBookTransactions,
});

LoanBookTransactions = Pagination({
  fetchDataAction: getLoanBookTransactions,
  name: 'loan-book-transactions',
})(LoanBookTransactions);

export default connect(mapStateToProps)(LoanBookTransactions);
