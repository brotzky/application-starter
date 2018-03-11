import React, { Component } from 'react';
import numeral from 'numeral';
import isEqual from 'lodash/isEqual';
import { getObjectValues } from 'grow-utils/objectFormatting';
import { updateRevolvingBalances } from '../../actions/affordability-calculator';

class CalculateShowResult extends Component {
  componentDidMount() {
    const { dispatch, val } = this.props;
    dispatch(updateRevolvingBalances(val.final));
  }

  componentWillUpdate(nextProps) {
    const { calculator, dispatch, val } = this.props;

    if (
      !isEqual(
        getObjectValues(calculator, 'revolvingBalance'),
        getObjectValues(nextProps.calculator, 'revolvingBalance'),
      ) ||
      nextProps.val.final !== val.final
    ) {
      dispatch(updateRevolvingBalances(nextProps.val.final));
    }
  }

  render() {
    const { val } = this.props;

    return (
      <span>
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

export default CalculateShowResult;
