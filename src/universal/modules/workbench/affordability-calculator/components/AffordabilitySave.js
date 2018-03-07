import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { getCalc } from 'grow-actions/affordability-calculator/affordability-calculator-async';
import { Select, Text, FormButton } from '../../../forms/fields/';

const fieldProps = {
  form: 'calculator',
  className: 'CalculatorSidebar',
  required: true,
};

const emptySelect = [
  {
    name: 'No saved calculators',
    value: null,
    disabled: true,
  },
];

class AffordabilitySave extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch, workbench, affordabilityCalculator } = this.props;
    if (affordabilityCalculator.calculator && nextProps.calculatorId) {
      if (
        nextProps.calculatorId !== affordabilityCalculator.calculator.id &&
        nextProps.calculatorId !== '0'
      ) {
        dispatch(getCalc(workbench.id, nextProps.calculatorId));
      }
    }
  }

  render() {
    const { affordabilityCalculator } = this.props;
    const savedCalculatorOptions = affordabilityCalculator.calculators.length
      ? affordabilityCalculator.calculators
      : emptySelect;

    return (
      <div>
        <Field
          name="calculatorId"
          component={Select}
          label="Load saved calculator"
          options={savedCalculatorOptions}
          selectText="Select a calculator"
        />
        <Field
          name="calculatorName"
          component={Text}
          label="Save calculator"
          placeholder="Calculator Name"
        />
        <Field
          name="submitButton"
          component={FormButton}
          buttonText="Save Calculator"
          permission="EDIT_DSR_CALCULATOR"
          isSubmitting={affordabilityCalculator.isSavingCalc}
          {...fieldProps}
        />
      </div>
    );
  }
}

const selector = formValueSelector('calculator');

const mapStateToProps = state => ({
  affordabilityCalculator: state.affordabilityCalculator,
  workbench: state.workbench,
  calculatorId: selector(state, 'calculatorId'),
});

AffordabilitySave = reduxForm({
  form: 'calculator',
})(AffordabilitySave);

export default connect(mapStateToProps)(AffordabilitySave);
