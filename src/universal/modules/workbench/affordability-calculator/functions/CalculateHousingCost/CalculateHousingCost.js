import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import CalculateHousingCostRender from './CalculateHousingCostRender';

export const total = calculator => calculator.housingCost.reduce((first, next) => first + numeral(next.amount)._value, 0);

class CalculateHousingCost extends Component {
  render() {
    return <CalculateHousingCostRender val={total(this.props.calculator)} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  calculator: state.form.calculator && state.form.calculator.values || {},
});

export default connect(mapStateToProps)(CalculateHousingCost);
