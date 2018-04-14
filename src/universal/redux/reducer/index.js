/**
 * Redux Reducers
 *
 * Root combineReducers to set global redux state.
 * Import all reducers into this file to configure state.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { modalReducer } from '../../modules/ui/modal/reducers/';

const rootReducer = combineReducers({
  modal: modalReducer,
});

export default rootReducer;
