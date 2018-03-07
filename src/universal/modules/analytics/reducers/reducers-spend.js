import { CASHFLOW_TRENDS_UPDATE_FILTER } from '../trends/constants';

export default function spendReducer(state = {}, action) {
  switch (action.type) {
    case CASHFLOW_TRENDS_UPDATE_FILTER:
      return Object.assign({}, state, {
        filter: Object.assign({}, state.filter, action.payload),
      });
    default:
      return state;
  }
}
