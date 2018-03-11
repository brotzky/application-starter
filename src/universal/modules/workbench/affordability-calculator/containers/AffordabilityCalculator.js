import React, { Component } from 'react';
import { connect } from 'react-redux';
import { configCalcDataForAPI } from '../data/calculator-api-data';
import {
  getAllCalc,
  saveCalc,
} from 'grow-actions/affordability-calculator/affordability-calculator-async';
import { ViewPermission } from '../../../ui/components';
import { permissionSelector } from 'gac-utils/selectors';
import AffordabilityForm from './AffordabilityForm';
import AffordabilityPlaceholder from '../components/AffordabilityPlaceholder';

const initialValues = {
  revolvingBalances: [{}],
  installmentDebt: [{}],
  housingCost: [{}],
  heloc: [{}],
};

class AffordabilityCalculator extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      dispatch,
      params,
      affordabilityCalculator,
      hasPermission,
    } = this.props;

    if (affordabilityCalculator.calculators.length === 0 && hasPermission) {
      dispatch(getAllCalc(params.workbenchId));
    }
  }

  handleSubmit(data) {
    const { dispatch, params, affordabilityCalculator } = this.props;
    dispatch(
      saveCalc(
        params.workbenchId,
        configCalcDataForAPI(data, affordabilityCalculator.debtServicing),
      ),
    );
  }

  render() {
    const { affordabilityCalculator } = this.props;

    if (affordabilityCalculator.isFetchingCalc) {
      return <AffordabilityPlaceholder />;
    }

    // initial value will set the toggle to "on"
    return (
      <ViewPermission permission="VIEW_DSR_CALCULATOR">
        <AffordabilityForm
          onSubmit={this.handleSubmit}
          initialValues={
            affordabilityCalculator.calculator
              ? {
                  ...affordabilityCalculator.calculator,
                  manualToggle: true,
                  transactionsToggle: true,
                  bothToggle: true,
                  creditBureauToggle: true,
                }
              : initialValues
          }
        />
      </ViewPermission>
    );
  }
}

const mapStateToProps = state => ({
  affordabilityCalculator: state.affordabilityCalculator,
  hasPermission: permissionSelector(state, 'VIEW_DSR_CALCULATOR'),
});

export default connect(mapStateToProps)(AffordabilityCalculator);
