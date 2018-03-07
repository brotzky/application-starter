import React from 'react';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import RecommendationDeclineForm from '../containers/RecommendationDeclineForm';

const RecommendationDeclineModal = props => {
  const { dispatch, workbench } = props;
  return (
    <ModalContent modalAction={() => dispatch(hideModal())}>
      <header className="RecommendationDeclineModal__header">
        <h4 className="RecommendationDeclineModal__header-heading">
          Decline {workbench.creator.firstName}'s{' '}
          {workbench.productName.split('-').join(' ')} application
        </h4>
      </header>
      <p>Please select your decline reason(s).</p>
      <RecommendationDeclineForm {...props} />
    </ModalContent>
  );
};

export default RecommendationDeclineModal;
