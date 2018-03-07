import React, { Component } from 'react';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { productApplicationStepProceed } from 'grow-actions/product-applications/product-applications-steps';
import { Button } from '..//../../ui/components';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';

class RecommendationApproveModal extends Component {
  constructor(props) {
    super(props);
    this.state = { isApproving: false };
  }

  handleApproveClick = () => {
    const { dispatch, member, workbench } = this.props;
    const body = { stepAction: 'APPROVE_APPLICATION' };
    this.setState({ isApproving: true });

    dispatch(
      notificationPush({
        id: workbench.id,
        message: `Accepting ${workbench.productName.split('-').join(' ')}`,
        kind: 'loading',
      }),
    );
    dispatch(
      productApplicationStepProceed(member.id, workbench.id, body),
    ).then(response => {
      dispatch(hideModal());
      dispatch(
        notificationEdit({
          id: workbench.id,
          message: response.error
            ? `Failed to accept ${workbench.productName
                .split('-')
                .join(' ')} application`
            : `${workbench.productName.split('-').join(' ')} accepted`,
          kind: response.error ? 'error' : 'success',
          dismissAfter: 5000,
        }),
      );
    });
  };

  render() {
    const { dispatch, workbench } = this.props;
    const { isApproving } = this.state;
    return (
      <ModalContent modalAction={() => dispatch(hideModal())}>
        <header className="RecommendationApproveModal__header">
          <h5 className="RecommendationApproveModal__header-heading">
            Accept {workbench.creator.firstName}
            's {workbench.productName.split('-').join(' ')} application
          </h5>
        </header>
        {/**
         * Temporarily inlining styles as this modal will be restyled
         * once we get v1 feature compeltion done.
         */}
        <div
          className="FormField ProfileFormField"
          style={{
            margin: '101px auto',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={this.handleApproveClick}
            isSubmitting={isApproving}
            text="Confirm"
            appearance="primary"
            size="large"
          />
        </div>
      </ModalContent>
    );
  }
}

export default RecommendationApproveModal;
