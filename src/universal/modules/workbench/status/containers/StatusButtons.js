import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import StatusActiveButton from '../components/StatusActiveButton';
import StatusDeclineButton from '../components/StatusDeclineButton';
import StatusOnHoldButton from '../components/StatusOnHoldButton';
import StatusFraudButton from '../components/StatusFraudButton';

const StatusButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  .FormButton {
    width: 180px;
    height: 45px;
    margin-left: 0;
  }
`;
const StatusButtons = () => (
  <StatusButtonsContainer>
    <StatusActiveButton />
    <StatusDeclineButton />
    <StatusOnHoldButton />
    <StatusFraudButton />
  </StatusButtonsContainer>
);

const mapStateToProps = state => ({
  workbench: state.workbench,
  firstName: state.member.member.firstName,
});

export default connect(mapStateToProps)(StatusButtons);
