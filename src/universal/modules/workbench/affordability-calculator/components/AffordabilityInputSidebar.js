import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { Field, change } from 'redux-form';
import numeral from 'numeral';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { Text } from '../../../forms/fields/';
import { permissionSelector } from 'gac-utils/selectors';
import { theme } from '../../../../themes';

const CalculatorSidebarTheme = {
  ...theme,
  fields: {
    flexDirection: 'column',
    marginBottom: '2rem',
  },
  labels: {
    color: '#585858',
    fontSize: '1.4rem',
    width: '100%',
    textTransform: 'initial',
  },
  select: {
    border: {
      width: '1px',
      style: 'solid',
    },
    background: 'transparent',
    width: '100%',
    svg: {
      height: '1.2rem',
      top: '4.2rem',
    },
  },
};

// Move out to be a dynamic prop
const NoPermissionMessage = styled.p`
  background: #f8f8fa;
  padding: 1.5rem 2rem 1.5rem 2rem;
  border: 1px solid #ebeef0;
  font-size: 1.4rem;
`;

const CalculatorSidebarInputs = styled.div`
  height: 100%;
  margin-bottom: 2rem;
  border-radius: 2px;

  &:focus,
  &:active {
    width: 100%;
    border-radius: initial;
  }

  &::-webkit-input-placeholder {
    color: #9a9a9a;
  }

  &::-moz-placeholder {
    color: #9a9a9a;
  }

  &:-ms-input-placeholder {
    color: #9a9a9a;
  }
`;

const currencyMask = createNumberMask({
  prefix: '$',
  allowDecimal: true,
});

class AffordabilityInputSidebar extends Component {
  syncGrossMonthly = (value, previousValue, allValues) => {
    this.props.dispatch(
      change(
        'calculator',
        'monthlyGross',
        numeral(allValues.annualGross)._value / 12,
      ),
    );
    return value;
  };

  syncGrossAnnual = (value, previousValue, allValues) => {
    this.props.dispatch(
      change(
        'calculator',
        'annualGross',
        numeral(allValues.monthlyGross)._value * 12,
      ),
    );
    return value;
  };

  render() {
    const { hasPermission } = this.props;

    return (
      <ThemeProvider theme={CalculatorSidebarTheme}>
        <CalculatorSidebarInputs>
          {!hasPermission && (
            <NoPermissionMessage>
              You do not have edit permissions for the affordability calculator.
            </NoPermissionMessage>
          )}
          <Field
            name="annualGross"
            component={Text}
            mask={currencyMask}
            placeholder="Annual Gross"
            label="Annual Gross"
            normalize={this.syncGrossMonthly}
            disabled={!hasPermission}
          />
          <Field
            name="monthlyGross"
            component={Text}
            mask={currencyMask}
            placeholder="Monthly Gross"
            label="Monthly Gross"
            normalize={this.syncGrossAnnual}
            disabled={!hasPermission}
          />
        </CalculatorSidebarInputs>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  hasPermission: permissionSelector(state, 'EDIT_DSR_CALCULATOR'),
});

export default connect(mapStateToProps)(AffordabilityInputSidebar);
