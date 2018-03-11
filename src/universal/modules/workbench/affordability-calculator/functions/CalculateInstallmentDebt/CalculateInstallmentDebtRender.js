import React, { Component } from 'react';
import numeral from 'numeral';
import isEqual from 'lodash/isEqual';
import { getObjectValues } from 'grow-utils/objectFormatting';
import { updateInstalmentDebt } from '../../actions/affordability-calculator';
import { calculatorPropType } from '../../../../../utils/proptypes';

class CalculateInstallmentDebtRender extends Component {
  componentDidMount() {
    const { dispatch, val } = this.props;
    dispatch(updateInstalmentDebt(val));
  }

  componentWillUpdate(nextProps) {
    const { calculator, dispatch, val } = this.props;

    if (
      !isEqual(
        getObjectValues(calculator, 'installmentDebt'),
        getObjectValues(nextProps.calculator, 'installmentDebt'),
      ) ||
      nextProps.val !== val
    ) {
      dispatch(updateInstalmentDebt(nextProps.val));
    }
  }

  render() {
    return <span>{numeral(this.props.val).format('$0,0.00')}</span>;
  }
}

CalculateInstallmentDebtRender.propTypes = {
  calculator: calculatorPropType.isRequired,
};

export default CalculateInstallmentDebtRender;
