import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CreditBureauAction from './CreditBureauAction';
import CreditBureauControlsContainer from './CreditBureauControlsContainer';
import SelectCreditReport from './SelectCreditReport';
import PullCreditBureau from './PullCreditBureau';

const CreditBureauActionHeader = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

/**
 * CreditBureauControls makes up the left card view of the
 * credit bureau tab. This contains the controls to Select
 * Credit Report and Pull Credit Bureau
 */
const CreditBureauControls = ({ creditBureau, memberId }) => (
  <CreditBureauControlsContainer>
    <CreditBureauAction text="Select credit bureau">
      <SelectCreditReport creditBureau={creditBureau} />
    </CreditBureauAction>
    <CreditBureauAction text="Pull credit bureau" margin>
      <PullCreditBureau memberId={memberId} />
    </CreditBureauAction>
  </CreditBureauControlsContainer>
);

const mapStateToProps = state => ({
  creditBureau: state.creditBureau,
});

export default connect(mapStateToProps)(CreditBureauControls);
