import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { adminStepsProceed } from 'grow-actions/product-applications/product-applications-steps';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { Button } from '../../../ui/components';

const ButtonContainer = styled.div`
  margin: 30px auto;
  text-align: center;
`;
const UnclaimedText = styled.p`margin-top: 20px;`;

const AccountSettingsModal = props => {
  const { dispatch, isClaimed, workbench } = props;

  return (
    <ModalContent
      modalFullscreen={false}
      modalAction={() => dispatch(hideModal())}
    >
      <div className="AccountSettingsModal">
        <h3 className="AccountSettingsModal__header">Create Account</h3>
        <p className="AccountSettingsModal__text">
          By confirming you will be creating a{' '}
          <strong>{workbench.prettyName}</strong> for{' '}
          <strong>{workbench.creator.firstName}</strong>{' '}
          <strong>{workbench.creator.lastName}</strong>
          .
        </p>
        <header className="AccountSettingsModalList__header">
          Deposit Account Details
        </header>
        <ul className="AccountSettingsModalList">
          <li className="AccountSettingsModalList__item">
            <div>Applicant</div>
            <div>
              {workbench.creator.firstName} {workbench.creator.lastName}
            </div>
          </li>
          <li className="AccountSettingsModalList__item">
            <div>Account</div> <div>{workbench.prettyName}</div>
          </li>
          <li className="AccountSettingsModalList__item">
            <div>Created</div>
            <div>
              {moment(workbench.dateCreated).format('MMM D, YYYY, h:mm a')}
            </div>
          </li>
          <li className="AccountSettingsModalList__item">
            <div>Manager</div>
            <div>
              {workbench.primaryRep.firstName} {workbench.primaryRep.lastName}
            </div>
          </li>
        </ul>
        <ButtonContainer>
          <Button
            isSubmitting={workbench.isUpdatingApplication}
            onClick={() =>
              dispatch(adminStepsProceed(workbench.id)).then(() =>
                dispatch(hideModal()),
              )}
            disabled={!isClaimed}
            text="Confirm"
            size="large"
          />
          {!isClaimed && (
            <UnclaimedText>
              You must be the manager of this application to proceed
            </UnclaimedText>
          )}
        </ButtonContainer>
      </div>
    </ModalContent>
  );
};

const mapStateToProps = state => ({
  workbench: state.workbench,
});

export default connect(mapStateToProps)(AccountSettingsModal);
