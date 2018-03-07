import { combineReducers } from 'redux';
import reducerCreditScore from './reducers-credit-score';
import reducerDebt from './reducers-debt';
import reducerSpend from './reducers-spend';
import reducerSuggestedProducts from './reducers-suggested-products';

export const analyticsReducer = combineReducers({
  creditScore: reducerCreditScore,
  debt: reducerDebt,
  spend: reducerSpend,
  suggestedProducts: reducerSuggestedProducts,
});

export default analyticsReducer;
