import React, { Component } from 'react';
import numeral from 'numeral';
import isEqual from 'lodash/isEqual';
import { getObjectValues } from 'grow-utils/objectFormatting';
import { updateInstalmentDebt } from '../../actions/affordability-calculator';

class CalculateInstallmentDebtRender extends Component {
  componentDidMount() {
    const { dispatch, val } = this.props;
    dispatch(updateInstalmentDebt(val));
  }

  componentWillUpdate(nextProps) {
    const { calculator, dispatch } = this.props;
    if (
      !isEqual(
        getObjectValues(calculator, 'installmentDebt'),
        getObjectValues(nextProps.calculator, 'installmentDebt'),
      )
    ) {
      dispatch(updateInstalmentDebt(nextProps.val));
    }
  }

  render() {
    return (
      <span className="CalculatorResult">
        {numeral(this.props.val).format('$0,0.00')}
      </span>
    );
  }
}

export default CalculateInstallmentDebtRender;
