import React, { Component } from 'react';
import numeral from 'numeral';
import isEqual from 'lodash/isEqual';
import { getObjectValues } from 'grow-utils/objectFormatting';
import { updateHeloc } from '../../actions/affordability-calculator';

class CalculateHelocRender extends Component {
  componentDidMount() {
    const { dispatch, val } = this.props;
    dispatch(updateHeloc(val.final));
  }

  componentWillUpdate(nextProps) {
    const { calculator, dispatch } = this.props;
    if (
      !isEqual(
        getObjectValues(calculator, 'heloc'),
        getObjectValues(nextProps.calculator, 'heloc'),
      )
    ) {
      dispatch(updateHeloc(nextProps.val.final));
    }
  }

  render() {
    const { val } = this.props;

    return (
      <span className="CalculatorResult">
        {(() => {
          if (val.final.toString().length === 5 && val.total <= 100) {
            return numeral(val.final).format('$0,0.000');
          } else if (val.final.toString().length === 4 && val.total <= 100) {
            return numeral(val.final).format('$0,0.00');
          }
          return numeral(val.final).format('$0,0.00');
        })()}
      </span>
    );
  }
}

export default CalculateHelocRender;
