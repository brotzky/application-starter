import React from 'react';
import { connect } from 'react-redux';

import CreditBureauControlsContainer from './CreditBureauControlsContainer';
import SelectCreditReport from './SelectCreditReport';
import PullCreditBureau from './PullCreditBureau';

/**
 * CreditBureauControls makes up the left card view of the
 * credit bureau tab. This contains the controls to Select
 * Credit Report and Pull Credit Bureau
 */
const CreditBureauControls = ({ creditBureau, memberId }) => (
  <CreditBureauControlsContainer>
    <SelectCreditReport creditBureau={creditBureau} />
    <PullCreditBureau memberId={memberId} />
  </CreditBureauControlsContainer>
);

const mapStateToProps = state => ({
  creditBureau: state.creditBureau,
});

export default connect(mapStateToProps)(CreditBureauControls);
