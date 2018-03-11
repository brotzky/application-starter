import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { formValueSelector } from 'redux-form';
import {
  isManualToggledPropType,
  isTransactionsToggledPropType,
  isBureauToggledPropType,
  isBothToggledPropType,
  calculatorPropType,
} from '../../../../../utils/proptypes';
import CalculateInstallmentDebtRender from './CalculateInstallmentDebtRender';
import filterCalc from '../filter-calculator';

export const total = calculator =>
  calculator.reduce((first, next) => first + numeral(next.amount)._value, 0);

class CalculateInstallmentDebt extends PureComponent {
  render() {
    // filtered items based on the toggle so we can get the right amount in total
    const filteredCalc = filterCalc(
      this.props.calculator.installmentDebt,
      this.props.isManualToggled,
      this.props.isTransactionsToggled,
      this.props.isBureauToggled,
      this.props.isBothToggled,
    );

    return (
      <CalculateInstallmentDebtRender
        val={total(filteredCalc)}
        {...this.props}
      />
    );
  }
}

const selector = formValueSelector('calculator');

CalculateInstallmentDebt.defaultProps = {
  isManualToggled: true,
  isTransactionsToggled: true,
  isBureauToggled: true,
  isBothToggled: true,
};

CalculateInstallmentDebt.propTypes = {
  calculator: calculatorPropType.isRequired,
  isManualToggled: isManualToggledPropType,
  isTransactionsToggled: isTransactionsToggledPropType,
  isBureauToggled: isBureauToggledPropType,
  isBothToggled: isBothToggledPropType,
};

const mapStateToProps = state => ({
  calculator: (state.form.calculator && state.form.calculator.values) || {},
  isManualToggled: selector(state, 'manualToggle'),
  isTransactionsToggled: selector(state, 'transactionsToggle'),
  isBureauToggled: selector(state, 'creditBureauToggle'),
  isBothToggled: selector(state, 'bothToggle'),
});

export default connect(mapStateToProps)(CalculateInstallmentDebt);
