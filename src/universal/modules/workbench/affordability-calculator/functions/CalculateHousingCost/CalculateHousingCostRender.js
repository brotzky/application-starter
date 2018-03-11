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
    const { calculator, dispatch, val } = this.props;

    if (
      !isEqual(
        getObjectValues(calculator, 'housingCost'),
        getObjectValues(nextProps.calculator, 'housingCost'),
      ) ||
      nextProps.val !== val
    ) {
      dispatch(updateHousingCost(nextProps.val));
    }
  }

  render() {
    return <span>{numeral(this.props.val).format('$0,0.00')}</span>;
  }
}

export default CalculateHousingCostRender;
