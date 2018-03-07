import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import numeral from 'numeral';
import {
  updateUDSR,
  updateGDSR,
  updateTDSR,
} from '../actions/affordability-calculator';

class AffordabiltiyResults extends Component {
  componentDidUpdate(nextProps) {
    const { affordabilityCalculator, dispatch } = this.props;
    /**
     * To Do
     * Create a better object comparision for the debt serving results
     * Most likely onl check the calculated values has updated!
     */
    if (
      JSON.stringify(affordabilityCalculator) !==
      JSON.stringify(nextProps.affordabilityCalculator)
    ) {
      dispatch(updateUDSR(this.calculateUDSR()));
      dispatch(updateGDSR(this.calculateGDSR()));
      dispatch(updateTDSR(this.calculateTDSR()));
    }
  }

  handleNaN(val) {
    return isNaN(val) || val === '0.00' || val === Infinity ? 0 : val;
  }

  calculateUDSR() {
    const {
      monthlyGross,
      affordabilityCalculator: {
        calculatedRevolvingBalances,
        calculatedInstalmentDebt,
      },
    } = this.props;
    const UDSR =
      (calculatedRevolvingBalances + calculatedInstalmentDebt) / monthlyGross;
    return this.handleNaN(UDSR);
  }

  calculateGDSR() {
    const {
      monthlyGross,
      affordabilityCalculator: { calculatedHousingCost, calculatedHeloc },
    } = this.props;
    const GDSR = (calculatedHousingCost + calculatedHeloc) / monthlyGross;
    return this.handleNaN(GDSR);
  }

  calculateTDSR() {
    const {
      monthlyGross,
      affordabilityCalculator: {
        calculatedRevolvingBalances,
        calculatedInstalmentDebt,
        calculatedHeloc,
        calculatedHousingCost,
      },
    } = this.props;
    const TDSR =
      (calculatedRevolvingBalances +
        calculatedInstalmentDebt +
        calculatedHeloc +
        calculatedHousingCost) /
      monthlyGross;
    return this.handleNaN(TDSR);
  }

  render() {
    return (
      <div className="CalculatorResults">
        <div>
          UDSR:{' '}
          <span className="CalculatorCalculated">
            {numeral(this.calculateUDSR()).format('0.00%')}
          </span>
        </div>
        <div>
          GDSR:{' '}
          <span className="CalculatorCalculated">
            {numeral(this.calculateGDSR()).format('0.00%')}
          </span>
        </div>
        <div>
          TDSR:{' '}
          <span className="CalculatorCalculated">
            {numeral(this.calculateTDSR()).format('0.00%')}
          </span>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('calculator');

const mapStateToProps = state => ({
  affordabilityCalculator: state.affordabilityCalculator,
  monthlyGross: numeral(selector(state, 'monthlyGross'))._value,
});

export default connect(mapStateToProps)(AffordabiltiyResults);
