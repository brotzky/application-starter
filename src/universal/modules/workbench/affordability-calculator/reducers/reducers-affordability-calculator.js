import {
  GET_CALC_REQUEST,
  GET_CALC_SUCCESS,
  GET_CALC_FAILURE,
  SAVE_CALC_REQUEST,
  SAVE_CALC_SUCCESS,
  SAVE_CALC_FAILURE,
  UPDATE_REVOLVING_BALANCES,
  UPDATE_INSTALMENT_DEBT,
  UPDATE_HELOC,
  UPDATE_HOUSING_COST,
  UPDATE_UDSR,
  UPDATE_GDSR,
  UPDATE_TDSR,
} from '../actions/constants';

import { RESET_WORKBENCH } from 'grow-actions/workbench/constants';

const initialState = {
  errors: [],
  isFetchingCalc: false,
  isSavingCalc: false,
  calculatedRevolvingBalances: 0,
  calculatedInstalmentDebt: 0,
  calculatedHeloc: 0,
  calculatedHousingCost: 0,
  calculators: [],
  debtServicing: {
    UDSR: 0,
    GDSR: 0,
    TDSR: 0,
  },
  ratio: 0,
};

export default function affordabilityCalculatorReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case UPDATE_REVOLVING_BALANCES:
    case UPDATE_INSTALMENT_DEBT:
    case UPDATE_HELOC:
    case UPDATE_HOUSING_COST:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case GET_CALC_REQUEST:
      return Object.assign({}, state, {
        isFetchingCalc: true,
      });
    case SAVE_CALC_REQUEST:
      return Object.assign({}, state, {
        isSavingCalc: true,
      });
    case SAVE_CALC_FAILURE:
    case GET_CALC_FAILURE:
      return Object.assign({}, state, {
        isFetchingCalc: false,
        isSavingCalc: false,
        errors: action.payload.errors,
        ...action.payload,
      });
    case SAVE_CALC_SUCCESS:
      return Object.assign({}, state, {
        isSavingCalc: false,
        ...action.payload.data,
      });
    case GET_CALC_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCalc: false,
        ...action.payload.data,
        ratio: action.payload.data.calculator
          ? action.payload.data.calculator.annualNet /
            action.payload.data.calculator.annualGross
          : null,
      });
    case UPDATE_UDSR:
    case UPDATE_GDSR:
    case UPDATE_TDSR:
      return Object.assign({}, state, {
        debtServicing: Object.assign({}, state.debtServicing, {
          ...action.payload,
        }),
      });
    case RESET_WORKBENCH:
      return initialState;
    default:
      return state;
  }
}
