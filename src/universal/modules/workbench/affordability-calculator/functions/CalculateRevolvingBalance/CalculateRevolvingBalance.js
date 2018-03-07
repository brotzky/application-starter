import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import CalculateRevolvingBalanceRender from './CalculateRevolvingBalanceRender';

export const getCalc = calculator => {
  const total = calculator.revolvingBalances.reduce(
    (first, next) => first + numeral(next.amount)._value,
    0
  );
  const final = !isNaN(total) ? total * 0.03 : 0;

  return {
    total,
    final
  };
};

class CalculateRevolvingBalance extends Component {
  render() {
    return (
      <CalculateRevolvingBalanceRender
        val={getCalc(this.props.calculator)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  calculator: (state.form.calculator && state.form.calculator.values) || {}
});

export default connect(mapStateToProps)(CalculateRevolvingBalance);
