import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import CalculateHelocRender from './CalculateHelocRender';

export const getCalc = (calculator) => {
  const total = calculator.heloc.reduce((first, next) => first + numeral(next.amount)._value, 0);
  const final = !isNaN(total) ? total * 0.005 : 0;

  return {
    total,
    final,
  };
};

class CalculateHeloc extends Component {
  render() {
    return <CalculateHelocRender val={getCalc(this.props.calculator)} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  calculator: state.form.calculator && state.form.calculator.values || {},
});

export default connect(mapStateToProps)(CalculateHeloc);
