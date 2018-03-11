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
import CalculateHelocRender from './CalculateHelocRender';
import filterCalc from '../filter-calculator';

export const getCalc = calculator => {
  const total = calculator.reduce(
    (first, next) => first + numeral(next.amount)._value,
    0,
  );
  const final = !isNaN(total) ? total * 0.005 : 0;

  return {
    total,
    final,
  };
};

class CalculateHeloc extends PureComponent {
  render() {
    // filtered items based on the toggle so we can get the right amount in total
    const filteredCalc = filterCalc(
      this.props.calculator.heloc,
      this.props.isManualToggled,
      this.props.isTransactionsToggled,
      this.props.isBureauToggled,
      this.props.isBothToggled,
    );

    return <CalculateHelocRender val={getCalc(filteredCalc)} {...this.props} />;
  }
}

const selector = formValueSelector('calculator');

CalculateHeloc.defaultProps = {
  isManualToggled: true,
  isTransactionsToggled: true,
  isBureauToggled: true,
  isBothToggled: true,
};

CalculateHeloc.propTypes = {
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

export default connect(mapStateToProps)(CalculateHeloc);
