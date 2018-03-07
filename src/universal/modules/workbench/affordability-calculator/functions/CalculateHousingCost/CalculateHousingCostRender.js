import React, { Component } from 'react';
import numeral from 'numeral';
import isEqual from 'lodash/isEqual';
import { getObjectValues } from 'grow-utils/objectFormatting';
import { updateHousingCost } from '../../actions/affordability-calculator';

class CalculateHousingCostRender extends Component {
  componentDidMount() {
    const { dispatch, val } = this.props;
    dispatch(updateHousingCost(val));
  }

  componentWillUpdate(nextProps) {
    const { calculator, dispatch } = this.props;

    if (
      !isEqual(
        getObjectValues(calculator, 'housingCost'),
        getObjectValues(nextProps.calculator, 'housingCost'),
      )
    ) {
      dispatch(updateHousingCost(nextProps.val));
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

export default CalculateHousingCostRender;
