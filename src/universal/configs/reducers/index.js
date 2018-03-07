import { combineReducers } from 'redux';
import appConfigReducer from './reducers-app-config';
import workbenchConfigReducer from './reducers-workbench-config';

export const configsReducer = combineReducers({
  app: appConfigReducer,
  workbench: workbenchConfigReducer,
});

export default configsReducer;
