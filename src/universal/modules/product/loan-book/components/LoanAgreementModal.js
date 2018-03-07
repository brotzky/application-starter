import React from 'react';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';

const LoanAgreementModal = props => {
  const { dispatch, link } = props;
  return (
    <ModalContent
      modalFullscreen={true}
      modalAction={() => dispatch(hideModal())}>
      <iframe src={link} style={{ width: '100%', height: '100%', border: 'none' }} />
    </ModalContent>
  );
};

export default LoanAgreementModal;
