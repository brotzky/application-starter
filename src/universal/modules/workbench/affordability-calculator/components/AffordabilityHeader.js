import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCalc } from 'grow-actions/affordability-calculator/affordability-calculator-async';
import { FadeInFast } from '../../../ui/transitions/';

class AffordabilityHeader extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch, workbench, affordabilityCalculator } = this.props;
    if (affordabilityCalculator.calculator && nextProps.calculatorId) {
      if (nextProps.calculatorId !== affordabilityCalculator.calculator.id) {
        dispatch(getCalc(workbench.id, nextProps.calculatorId));
      }
    }
  }

  render() {
    const { affordabilityCalculator } = this.props;

    return (
      <div className="SectionHeader">
        <div>
          <FadeInFast>
            <h2 className="SectionHeader__heading">Affordability Calculator</h2>
          </FadeInFast>
        </div>
        <div>
          <h3 className="SectionHeader__name">
            {affordabilityCalculator.calculator ? (
              affordabilityCalculator.calculator.name
            ) : null}
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  affordabilityCalculator: state.affordabilityCalculator,
  workbench: state.workbench,
});

export default connect(mapStateToProps)(AffordabilityHeader);
