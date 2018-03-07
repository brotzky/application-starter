import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import StatusActiveFormWrapper from '../components/StatusActiveForm';
import StatusDeclineFormWrapper from '../components/StatusDeclineForm';
import StatusOnHoldFormWrapper from '../components/StatusOnHoldForm';
import StatusFraudFormWrapper from '../components/StatusFraudForm';
import StatusModalHeader from '../components/StatusModalHeader';

const Subheading = styled.h6`
  padding: 2rem;
  text-align: center;
`;

const StatusModal = props => {
  const { dispatch, workbench, changeToStatus } = props;
  return (
    <ModalContent modalAction={() => dispatch(hideModal())}>
      <StatusModalHeader workbench={workbench} />
      {changeToStatus === 'active' ? (
        <Subheading>
          You are going to change the application to {changeToStatus}. Are you
          sure?
        </Subheading>
      ) : (
        <Subheading>
          Please select your reason(s) for {changeToStatus}
        </Subheading>
      )}
      {changeToStatus === 'active' && <StatusActiveFormWrapper {...props} />}
      {changeToStatus === 'decline' && <StatusDeclineFormWrapper {...props} />}
      {changeToStatus === 'on hold' && <StatusOnHoldFormWrapper {...props} />}
      {changeToStatus === 'fraud' && <StatusFraudFormWrapper {...props} />}
    </ModalContent>
  );
};

StatusModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeToStatus: PropTypes.string.isRequired,
  workbench: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default StatusModal;
