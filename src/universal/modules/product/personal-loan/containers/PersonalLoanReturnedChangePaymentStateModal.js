import React, { Component } from 'react';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import PersonalLoanReturnedChangePaymentStateForm from './PersonalLoanReturnedChangePaymentStateForm';

class PersonalLoanReturnedChangePaymentStateModal extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}>
        <div>
          <h3 className="u-heading-5">Take Action on Returned Item</h3>
          <PersonalLoanReturnedChangePaymentStateForm {...this.props} hideModal={hideModal} />
        </div>
      </ModalContent>
    );
  }
}

export default PersonalLoanReturnedChangePaymentStateModal;
