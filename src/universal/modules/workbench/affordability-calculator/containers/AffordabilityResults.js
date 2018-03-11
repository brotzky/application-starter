import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, Field } from 'redux-form';
import styled from 'styled-components';
import numeral from 'numeral';
import {
  updateUDSR,
  updateGDSR,
  updateTDSR,
} from '../actions/affordability-calculator';

const ToggleWrapper = styled.div`
  margin-bottom: 3.5rem;
`;

const ToggleItem = styled.div`
  margin-bottom: 1.3rem;
  line-height: 1.5rem;
`;

const CalculatorCalculated = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.blue};
`;

const ToggleCheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + label::before {
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMCkiPgo8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNiwxMiAxMCwxNiAxOCw4IAoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KPC9nPjwvc3ZnPg==');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #448aff;
    border-color: #448aff;
  }
}`;

const ToggleCheckBoxLabel = styled.label`
  position: relative;
  cursor: pointer;
  color: #262626;
  font-weight: 400;
  font-size: 1.4rem;

  &::before {
    display: inline-block;
    width: 20px;
    height: 20px;
    content: '';
    vertical-align: middle;
    border-radius: 50%;
    margin-right: 1rem;
    border: 1px solid #adadad;
    transition: all 200ms ease;
  }
`;

const ToggleCheckBox = props => (
  <ToggleItem>
    <ToggleCheckBoxInput
      {...props.input}
      name={props.text}
      type="checkbox"
      id={props.text}
      checked={props.input.value}
    />
    <ToggleCheckBoxLabel htmlFor={props.text}>{props.text}</ToggleCheckBoxLabel>
  </ToggleItem>
);

class AffordabilityResults extends Component {
  componentDidUpdate(nextProps) {
    const { affordabilityCalculator, dispatch } = this.props;
    /**
     * To Do
     * Create a better object comparision for the debt serving results
     * Most likely onl check the calculated values has updated!
     */
    if (
      JSON.stringify(affordabilityCalculator) !==
      JSON.stringify(nextProps.affordabilityCalculator)
    ) {
      dispatch(updateUDSR(this.calculateUDSR()));
      dispatch(updateGDSR(this.calculateGDSR()));
      dispatch(updateTDSR(this.calculateTDSR()));
    }
  }

  handleNaN(val) {
    return isNaN(val) || val === '0.00' || val === Infinity ? 0 : val;
  }

  calculateUDSR() {
    const {
      monthlyGross,
      affordabilityCalculator: {
        calculatedRevolvingBalances,
        calculatedInstalmentDebt,
      },
    } = this.props;
    const UDSR =
      (calculatedRevolvingBalances + calculatedInstalmentDebt) / monthlyGross;
    return this.handleNaN(UDSR);
  }

  calculateGDSR() {
    const {
      monthlyGross,
      affordabilityCalculator: { calculatedHousingCost, calculatedHeloc },
    } = this.props;
    const GDSR = (calculatedHousingCost + calculatedHeloc) / monthlyGross;
    return this.handleNaN(GDSR);
  }

  calculateTDSR() {
    const {
      monthlyGross,
      affordabilityCalculator: {
        calculatedRevolvingBalances,
        calculatedInstalmentDebt,
        calculatedHeloc,
        calculatedHousingCost,
      },
    } = this.props;
    const TDSR =
      (calculatedRevolvingBalances +
        calculatedInstalmentDebt +
        calculatedHeloc +
        calculatedHousingCost) /
      monthlyGross;
    return this.handleNaN(TDSR);
  }

  render() {
    return (
      <div>
        <ToggleWrapper>
          <Field
            name="manualToggle"
            component={ToggleCheckBox}
            parse={value => !!value}
            text="Manual"
          />
          <Field
            name="transactionsToggle"
            component={ToggleCheckBox}
            parse={value => !!value}
            text="Transactions"
          />
          <Field
            name="creditBureauToggle"
            component={ToggleCheckBox}
            parse={value => !!value}
            text="Credit Bureau"
          />
          <Field
            name="bothToggle"
            component={ToggleCheckBox}
            parse={value => !!value}
            text="Both"
          />
        </ToggleWrapper>

        <div>
          UDSR:{' '}
          <CalculatorCalculated>
            {numeral(this.calculateUDSR()).format('0.00%')}
          </CalculatorCalculated>
        </div>
        <div>
          GDSR:{' '}
          <CalculatorCalculated>
            {numeral(this.calculateGDSR()).format('0.00%')}
          </CalculatorCalculated>
        </div>
        <div>
          TDSR:{' '}
          <CalculatorCalculated>
            {numeral(this.calculateTDSR()).format('0.00%')}
          </CalculatorCalculated>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('calculator');

const mapStateToProps = state => ({
  affordabilityCalculator: state.affordabilityCalculator,
  monthlyGross: numeral(selector(state, 'monthlyGross'))._value,
  isManualToggled: selector(state, 'manualToggle'),
  isTransactionsToggled: selector(state, 'transactionsToggle'),
  isBureauToggled: selector(state, 'creditBureauToggle'),
  isBothToggled: selector(state, 'bothToggle'),
});

export default connect(mapStateToProps)(AffordabilityResults);
