import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import LoanBookCollectionsForm from './LoanBookCollectionsForm';

const LoanBookCollectionsModalHeaderStyle = {
  padding: '1.5rem',
  marginBottom: '1.5rem',
  background: 'rgba(244, 67, 54, 0.05)',
  color: 'rgb(244, 67, 54)',
  border: '1px solid rgb(244, 67, 54)',
  borderRadius: '4px',
  textAlign: 'center',
  fontWeight: '500',
};

class LoanBookCollectionsModal extends Component {
  render() {
    const { loanBookPayments: { createdCollectionsSuccess, createdCollectionsFailure }, dispatch, email, payment } = this.props;
    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}>
        <div className="LoanBookCollectionsModal">
          <div style={LoanBookCollectionsModalHeaderStyle}>
            {payment &&
              <span>Selected Payment Date: {payment.expectedPaymentDateTimeInUtc.substring(0, 10).replace(/\//g, '-')}</span>}
          </div>
          {
            createdCollectionsSuccess
            ? <p style={{ maxWidth: '540px', fontWeight: '500', fontSize: '1.875rem' }}>We have successfully received your request. Please allow up to 24 hours for us to complete your request. Thank you.</p>
            : <div>
                <h3 className="u-heading-6">Please select one or more of the following options.</h3>
                <LoanBookCollectionsForm email={email} paymentId={payment.id} />
                <p style={{ maxWidth: '540px' }}><em>Unless instructed, any accrued interest will be adjusted at the end of the term, either increasing or decreasing last payment(s).</em></p>
              </div>
          }
        </div>
      </ModalContent>
    );
  }
}

const mapStateToProps = state => ({
  loanBookPayments: state.product.loanBookPayments,
});

export default connect(mapStateToProps)(LoanBookCollectionsModal);
