import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLoanBookOverview } from 'grow-actions/loan-book/loan-book';
import { productApplication } from 'grow-utils/productApplicationUtils';
import LoanBookAmortization from './LoanBookAmortization';
import LoanBookPayments from './LoanBookPayments';
import LoanBookTransactions from './LoanBookTransactions';
import LoanBookLoanAgreement from '../components/LoanBookLoanAgreement';
import LoanBookHeader from '../components/LoanBookHeader';
import MemberNotes from '../../../member/containers/MemberNotes';
import MemberNoteComposer from '../../../member/containers/MemberNoteComposer';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { Button } from '../../../forms/fields/FormButton';
import { EmptyBox } from '../../../ui/icons/';
import { Card, EmptyState } from '../../../ui/components';

class LoanBook extends Component {
  componentWillMount() {
    const { dispatch, params } = this.props;

    if (params.productId && params.productId !== 'not-found') {
      dispatch(getLoanBookOverview(params.productId));
    }
  }

  componentWillUnmount() {
    return this.props.dispatch({ type: 'RESET_LOAN_BOOK' });
  }

  renderEmptyState() {
    const { member } = this.props.member;

    return (
      <Card>
        <EmptyState
          Icon={EmptyBox}
          text={`No Product for ${member.firstName} ${member.lastName}, yet.`}
          erorrs={member.errors}
        />
      </Card>
    );
  }

  render() {
    const {
      dispatch,
      member,
      member: { isFetching, productApplications },
      loanBookOverview,
      params,
      permissions,
      org,
    } = this.props;
    const shouldRenderEmptyState =
      params.productId === 'not-found' ||
      (!isFetching &&
        productApplications &&
        !productApplications.find(p =>
          p.resources.find(r => r.serviceName === 'GET_LOAN_BOOK'),
        ));
    if (shouldRenderEmptyState) {
      return this.renderEmptyState();
    }
    const currentApplication = productApplications.find(p =>
      p.resources.find(r => r.resource.id === params.productId),
    );
    const loanAgreementLink =
      currentApplication &&
      productApplication(org, currentApplication).getLoanAgreementUrl();

    return (
      <div className="LoanBook">
        <div className="LoanBook__top">
          <LoanBookHeader
            {...loanBookOverview}
            dispatch={dispatch}
            params={params}
          />
        </div>
        <div className="LoanBook__body">
          <div className="LoanBook__section-header">
            <h3 className="Member__heading">Loan Agreement</h3>
            <Button
              buttonText="View Loan Agreement"
              onClick={() =>
                dispatch(
                  showModal('LOAN_AGREEMENT_MODAL', {
                    dispatch,
                    link: loanAgreementLink,
                  }),
                )}
              className="LoanBook__button"
              permission="VIEW_PAYMENT_SCHEDULE"
            />
          </div>
          <LoanBookLoanAgreement {...loanBookOverview} />
          <div className="LoanBook__section-header">
            <h3 className="Member__heading">Payment Schedule</h3>
            <div>
              <Button
                buttonText="Make Extra Payment"
                onClick={() =>
                  dispatch(
                    showModal('LOAN_BOOK_EXTRA_PAYMENT_MODAL', {
                      productId: params.productId,
                    }),
                  )}
                className="LoanBook__button"
                permission="EDIT_PAYMENT_SCHEDULE"
              />
              <Button
                buttonText="Edit Payment Schedule"
                onClick={() =>
                  dispatch(
                    showModal('LOAN_BOOK_EDIT_PAYMENT_SCHEDULE_MODAL', {
                      productId: params.productId,
                    }),
                  )}
                className="LoanBook__button"
                permission="EDIT_PAYMENT_SCHEDULE"
              />
            </div>
          </div>
          <LoanBookPayments params={params} />
          <h3 className="Member__heading">Transactions</h3>
          <LoanBookTransactions params={params} />
          <h3 className="Member__heading">Amortization Table</h3>
          <LoanBookAmortization params={params} />
          <h3 className="Member__heading">Notes</h3>
          {member.member && <MemberNotes defaultCategory="product" />}
        </div>
        {currentApplication && (
          <MemberNoteComposer
            category={`product-${currentApplication.id}`}
            dispatch={dispatch}
            member={member}
            permissions={permissions}
          />
        )}
      </div>
    );
  }
}

LoanBook.propTypes = {
  dispatch: PropTypes.func.isRequired,
  member: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  ).isRequired,
  loanBookOverview: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  ).isRequired,
  permissions: PropTypes.objectOf(PropTypes.objectOf(PropTypes.object))
    .isRequired,
  org: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loanBookOverview: state.product.loanBookOverview,
  member: state.member,
  permissions: (state.permissions && state.permissions.permissions) || {},
  org: state.auth.organization,
});

export default connect(mapStateToProps)(LoanBook);
