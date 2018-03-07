import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import Pagination from '../../../ui/pagination/containers/Pagination';
import QueueItem from '../../../queue/containers/QueueItem';
import { getLoanBookPayments } from 'grow-actions/loan-book/loan-book';
import { ChevronLeft, ChevronRight, MenuDots } from '../../../ui/icons/';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import { Transition } from '../../../ui/transitions';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { EmptyState } from '../../../ui/components';

class LoanBookPayments extends QueueItem {
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

  handleCollectionsClick(payment) {
    const { dispatch, user } = this.props;
    return dispatch(
      showModal('LOAN_BOOK_COLLECTIONS_MODAL', {
        email: user.email,
        payment,
      }),
    );
  }

  renderloanBookPaymentsList() {
    const { data: loanBookPayments } = this.props;

    if (loanBookPayments.errors.includes('NO_PERMISSION')) {
      return <EmptyState errors={loanBookPayments.errors} />;
    }

    return (
      <ul className="QueueList">
        {loanBookPayments.payments.length > 0 &&
          loanBookPayments.payments.map(payment => {
            return (
              <li key={payment.id} className="QueueItem">
                <ul className="QueueItem__wrapper">
                  <li className="QueueItem__cell">
                    {payment.expectedPaymentDateTimeInUtc
                      .substring(0, 10)
                      .replace(/\//g, '-')}
                  </li>
                  <li className="QueueItem__cell">{payment.scheduleType}</li>
                  <li className="QueueItem__cell">{payment.paymentType}</li>
                  <li className="QueueItem__cell">
                    {moment(
                      payment.expectedPaymentDateTimeInUtc
                        .substring(0, 10)
                        .replace(/\//g, '-'),
                    ).fromNow()}
                  </li>
                  <li className="QueueItem__cell">{payment.currentState}</li>
                  <li className="QueueItem__cell">
                    {numeral(payment.expectedPaymentAmount).format('$0,00.00')}
                  </li>
                  <li className="QueueItem__cell">
                    {numeral(payment.paymentTransactionsSumTotal).format(
                      '$0,00.00',
                    )}
                  </li>
                  <li className="QueueItem__cell">
                    {payment.currentState} {payment.delinquencyState}{' '}
                    {payment.returnedState}
                  </li>
                  <li className="QueueItem__cell">
                    {payment.numberOfTransactions}
                  </li>
                  <li className="QueueItem__cell">
                    {payment.daysDelinquent || 'N/A'}
                  </li>
                  <li className="QueueItem__cell QueueItem__cell--sm QueueItem__cell--align-right">
                    <div
                      className="QueueItem__menu-dots"
                      onClick={event =>
                        this.handleActionMenuClick(event, payment.id)}
                    >
                      <MenuDots
                        className={`QueueItem__menu-dots-icon ${addClassNameIf(
                          loanBookPayments.showActionMenu === payment.id,
                          'QueueItem__menu-dots-icon--active',
                        )}`}
                      />
                    </div>
                    <Transition transitionName="QueueActions">
                      {loanBookPayments.showActionMenu === payment.id && (
                        <div className="QueueActions">
                          <span
                            className="QueueActions__item"
                            onClick={() => this.handleCollectionsClick(payment)}
                          >
                            Collections
                          </span>
                        </div>
                      )}
                    </Transition>
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
      data: loanBookPayments,
      params,
    } = this.props;
    return (
      <div className="Member__box Member__box--ofh">
        <header className="QueueHeader">
          <ul className="QueueList QueueHeader__list">
            <li className="QueueItem QueueHeader__item">
              <ul className="QueueItem__wrapper QueueHeader__item-wrapper">
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Due Date</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Schedule</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Type</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">When</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">State</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Expected</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Received</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">States</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Transactions</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Days Delinquent</span>
                </li>
                {/* <li className="QueueItem__cell"><span className="QueueItem__heading">Comment</span></li> */}
                <li className="QueueItem__cell QueueItem__cell--sm" />
              </ul>
            </li>
          </ul>
        </header>
        {loanBookPayments.isFetching ? (
          <div className="QueuePlaceholder" />
        ) : (
          this.renderloanBookPaymentsList()
        )}

        <div className="CashflowTransactionsControls">
          <div>
            <span>Page {loanBookPayments.page}</span>
          </div>
          <div>
            <button
              disabled={
                loanBookPayments.isFetching || !hasMoreResults('previous')
              }
              className="QueuePagination__button"
              type="button"
              onClick={() => handlePagination('previous', params.productId)}
            >
              <ChevronLeft className="QueuePagination__button-icon" />
            </button>
            <button
              disabled={loanBookPayments.isFetching || !hasMoreResults('next')}
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
  data: state.product.loanBookPayments,
  user: state.user,
});

LoanBookPayments = Pagination({
  fetchDataAction: getLoanBookPayments,
  name: 'loan-book-payments',
})(LoanBookPayments);

export default connect(mapStateToProps)(LoanBookPayments);
