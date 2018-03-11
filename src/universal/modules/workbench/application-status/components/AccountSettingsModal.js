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
const UnclaimedText = styled.p`
  margin-top: 20px;
`;

const AccountSettingsModalContainer = styled.div`
  max-width: 500px;
  padding: 1rem 1rem 0;
`;

const AccountSettingsModalHeader = styled.h3`
  font-size: ${props => props.theme.font.size3};
  margin-bottom: 2.4rem;
`;

const AccountSettingsModalText = styled.p`
  margin-bottom: 1.6rem;
`;

const AccountSettingsModalListHeader = styled.header`
  border: 1px solid #efefef;
  border-bottom: 0;
  color: ${props => props.theme.colors.black};
  padding: 14px;
  font-weight: 600;
  background: #f8f8f8;
`;

const AccountSettingsModalList = styled.ul`
  color: ${props => props.theme.colors.black};
  margin-bottom: 2.4rem;
  padding: 18px 14px;
  border: 1px solid #eee;
`;

const AccountSettingsModalListItem = styled.li`
  list-style: none;
  display: flex;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }

  & > div {
    min-width: 95px;
    font-weight: 500;
  }

  & div:last-child {
    font-weight: 400;
  }
`;

const AccountSettingsModal = props => {
  const { dispatch, isClaimed, workbench } = props;

  return (
    <ModalContent
      modalFullscreen={false}
      modalAction={() => dispatch(hideModal())}
    >
      <AccountSettingsModalContainer>
        <AccountSettingsModalHeader>Create Account</AccountSettingsModalHeader>
        <AccountSettingsModalText>
          By confirming you will be creating a{' '}
          <strong>{workbench.prettyName}</strong> for{' '}
          <strong>{workbench.creator.firstName}</strong>{' '}
          <strong>{workbench.creator.lastName}</strong>
          .
        </AccountSettingsModalText>
        <AccountSettingsModalListHeader>
          Deposit Account Details
        </AccountSettingsModalListHeader>
        <AccountSettingsModalList>
          <AccountSettingsModalListItem>
            <div>Applicant</div>
            <div>
              {workbench.creator.firstName} {workbench.creator.lastName}
            </div>
          </AccountSettingsModalListItem>
          <AccountSettingsModalListItem>
            <div>Account</div> <div>{workbench.prettyName}</div>
          </AccountSettingsModalListItem>
          <AccountSettingsModalListItem>
            <div>Created</div>
            <div>
              {moment(workbench.dateCreated).format('MMM D, YYYY, h:mm a')}
            </div>
          </AccountSettingsModalListItem>
          <AccountSettingsModalListItem>
            <div>Manager</div>
            <div>
              {workbench.primaryRep.firstName} {workbench.primaryRep.lastName}
            </div>
          </AccountSettingsModalListItem>
        </AccountSettingsModalList>
        <ButtonContainer>
          <Button
            isSubmitting={workbench.isUpdatingApplication}
            onClick={() =>
              dispatch(adminStepsProceed(workbench.id)).then(() =>
                dispatch(hideModal()),
              )
            }
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
      </AccountSettingsModalContainer>
    </ModalContent>
  );
};

const mapStateToProps = state => ({
  workbench: state.workbench,
});

export default connect(mapStateToProps)(AccountSettingsModal);
