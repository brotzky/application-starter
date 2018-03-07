import {
  UPDATE_REVOLVING_BALANCES,
  UPDATE_INSTALMENT_DEBT,
  UPDATE_HELOC,
  UPDATE_HOUSING_COST,
  UPDATE_UDSR,
  UPDATE_GDSR,
  UPDATE_TDSR,
  CALC_RESET
} from './constants';

export function updateRevolvingBalances(calculatedRevolvingBalances) {
  return {
    type: UPDATE_REVOLVING_BALANCES,
    payload: {
      calculatedRevolvingBalances
    }
  };
}

export function updateInstalmentDebt(calculatedInstalmentDebt) {
  return {
    type: UPDATE_INSTALMENT_DEBT,
    payload: {
      calculatedInstalmentDebt
    }
  };
}

export function updateHeloc(calculatedHeloc) {
  return {
    type: UPDATE_HELOC,
    payload: {
      calculatedHeloc
    }
  };
}

export function updateHousingCost(calculatedHousingCost) {
  return {
    type: UPDATE_HOUSING_COST,
    payload: {
      calculatedHousingCost
    }
  };
}

export function updateUDSR(UDSR) {
  return {
    type: UPDATE_UDSR,
    payload: {
      UDSR
    }
  };
}

export function updateGDSR(GDSR) {
  return {
    type: UPDATE_GDSR,
    payload: {
      GDSR
    }
  };
}

export function updateTDSR(TDSR) {
  return {
    type: UPDATE_TDSR,
    payload: {
      TDSR
    }
  };
}

export function resetCalc() {
  return {
    type: CALC_RESET
  };
}
