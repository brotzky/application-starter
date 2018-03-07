import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import CalculateInstallmentDebtRender from './CalculateInstallmentDebtRender';

export const total = calculator => calculator.installmentDebt.reduce((first, next) => first + numeral(next.amount)._value, 0);

class CalculateInstallmentDebt extends Component {
  render() {
    return <CalculateInstallmentDebtRender val={total(this.props.calculator)} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  calculator: state.form.calculator && state.form.calculator.values || {},
});

export default connect(mapStateToProps)(CalculateInstallmentDebt);
