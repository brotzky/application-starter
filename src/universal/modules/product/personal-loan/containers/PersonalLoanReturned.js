import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';
import numeral from 'numeral';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import QueueItem from '../../../queue/containers/QueueItem';
import { getLoanBookPaymentsReturned } from 'grow-actions/loan-book/loan-book-payments-returned';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { MenuDots } from '../../../ui/icons/';
import { Transition } from '../../../ui/transitions';
import { EmptyFolder } from '../../../ui/icons/';
import { EmptyState } from '../../../ui/components';

class PersonalLoanReturned extends QueueItem {
  componentWillMount() {
    const query = queryString.stringify({ start: 0, end: 999 });
    return this.props.dispatch(getLoanBookPaymentsReturned(query));
  }

  handleChangePaymentClick(payment) {
    const {
      dispatch,
      paymentsReturned: { payments },
      user: { email },
    } = this.props;
    return dispatch(
      showModal('PERSONAL_LOAN_RETURNED_CHANGE_PAYMENT_STATE_MODAL', {
        dispatch,
        email,
        payment: payments.find(p => p.id === payment.id),
      }),
    );
  }

  render() {
    const {
      paymentsReturned: { isFetching, isLoaded, payments, selectedPaymentId },
    } = this.props;
    if (!isFetching && isLoaded && !payments.length) {
      return (
        <div className="Member__box">
          <EmptyState Icon={EmptyFolder} text={`No Returned Items, yet.`} />
        </div>
      );
    }

    return (
      <div>
        <h3 className="Member__heading">Returned Payments</h3>
        <div className="Member__box">
          <header className="QueueHeader">
            <ul className="QueueList QueueHeader__list">
              <li className="QueueItem QueueHeader__item">
                <ul className="QueueItem__wrapper QueueHeader__item-wrapper">
                  <li className="QueueItem__cell" style={{ flex: '1.25' }}>
                    <span className="QueueItem__heading">Name</span>
                  </li>
                  <li className="QueueItem__cell" style={{ flex: '1.25' }}>
                    <span className="QueueItem__heading">Email</span>
                  </li>
                  <li className="QueueItem__cell">
                    <span className="QueueItem__heading">Due Date</span>
                  </li>
                  <li className="QueueItem__cell">
                    <span className="QueueItem__heading">Schedule</span>
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
                  <li className="QueueItem__cell">
                    <span className="QueueItem__heading">Queue State</span>
                  </li>
                  <li className="QueueItem__cell">
                    <span className="QueueItem__heading">Comments</span>
                  </li>
                  <li className="QueueItem__cell" style={{ flex: '0.25' }} />
                </ul>
              </li>
            </ul>
          </header>
          {isFetching ? (
            <div className="QueuePlaceholder" />
          ) : (
            <ul className="QueueList">
              {payments.length > 0 &&
                payments.map(payment => {
                  return (
                    <li key={payment.id} className="QueueItem">
                      <ul className="QueueItem__wrapper">
                        <li
                          className="QueueItem__cell"
                          style={{ flex: '1.25' }}
                        >
                          <Link
                            className="QueueItem__link"
                            to={`/members/${payment.member.id}`}
                          >
                            {payment.member.firstName} {payment.member.lastName}
                          </Link>
                        </li>
                        <li
                          className="QueueItem__cell"
                          style={{ flex: '1.25' }}
                        >
                          <Link
                            className="QueueItem__link"
                            to={`/members/${payment.member.id}`}
                          >
                            {payment.member.email}
                          </Link>
                        </li>
                        <li className="QueueItem__cell">
                          {moment(
                            payment.expectedPaymentDateTimeInUtc
                              .substring(0, 10)
                              .replace(/\//g, '-'),
                          ).format('YYYY-MM-DD')}
                        </li>
                        <li className="QueueItem__cell">
                          {payment.scheduleType}
                        </li>
                        <li className="QueueItem__cell">
                          {moment(
                            payment.expectedPaymentDateTimeInUtc
                              .substring(0, 10)
                              .replace(/\//g, '-'),
                          ).fromNow()}
                        </li>
                        <li className="QueueItem__cell">
                          {payment.currentState}
                        </li>
                        <li className="QueueItem__cell">
                          {numeral(payment.expectedPaymentAmount).format(
                            '$0,00.00',
                          )}
                        </li>
                        <li className="QueueItem__cell">
                          {numeral(payment.paymentTransactionsSumTotal).format(
                            '$0,00.00',
                          )}
                        </li>
                        <li className="QueueItem__cell">
                          {payment.currentState}, {payment.delinquencyState}{' '}
                          {payment.returnedState}
                        </li>
                        <li className="QueueItem__cell">
                          {payment.numberOfTransactions}
                        </li>
                        <li className="QueueItem__cell">N/A</li>
                        <li className="QueueItem__cell">
                          {payment.returnedState}
                        </li>
                        <li className="QueueItem__cell">
                          {payment.deleteReason}
                        </li>
                        <li
                          className="QueueItem__cell QueueItem__cell--align-right"
                          style={{ flex: '0.25' }}
                        >
                          <div
                            className="QueueItem__menu-dots"
                            onClick={event =>
                              this.handleActionMenuClick(event, payment.id)
                            }
                          >
                            <MenuDots
                              className={`QueueItem__menu-dots-icon ${addClassNameIf(
                                selectedPaymentId === payment.id,
                                'QueueItem__menu-dots-icon--active',
                              )}`}
                            />
                          </div>
                          <Transition transitionName="QueueActions">
                            {selectedPaymentId === payment.id && (
                              <div className="QueueActions">
                                <span
                                  className="QueueActions__item"
                                  onClick={() =>
                                    this.handleChangePaymentClick(payment)
                                  }
                                >
                                  View Actions
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
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentsReturned: state.personalLoanPaymentsReturned,
  user: state.user,
});

export default connect(mapStateToProps)(AuthWrapper(PersonalLoanReturned));
