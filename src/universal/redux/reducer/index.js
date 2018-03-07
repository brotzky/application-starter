/**
 * Redux Reducers
 *
 * Root combineReducers to set global redux state.
 * Import all reducers into this file to configure state.
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import { affordabilityCalculatorReducer } from '../../modules/workbench/affordability-calculator/reducers/';
import { cashflowTransactionsReducer } from '../../modules/workbench/cash-flow-transactions/reducers/';

import { configsReducer } from '../../configs/reducers';
import { checklistReducer } from '../../modules/workbench/checklist/reducers/';
import { creditBureauReducer } from '../../modules/workbench/credit-bureau/reducers/';
import {
  filesReducer,
  memberReducer,
  membersReducer,
  notesReducer,
} from '../../modules/member/reducers/';
import { modalReducer } from '../../modules/ui/modal/reducers/';
import { notificationsReducer } from '../../modules/ui/notifications/reducers/';
// import { productReducer } from '../../modules/product/reducers/';
import { profileReducer } from '../../modules/account/profile/reducers/';
import { queueReducer } from '../../modules/queue/reducers';
import { searchReducer } from '../../modules/search/reducers/';
import {
  authReducer,
  permissionsReducer,
  userReducer,
} from '../../modules/auth/reducers/';
import { usersReducer } from '../../modules/account/users/reducers/';
// import { statusReducer } from '../../modules/workbench/status/reducers/';
import { workbenchReducer } from '../../modules/workbench/shell/reducers/';
import { filtersReducer } from '../../modules/applications/reducers';

const rootReducer = combineReducers({
  affordabilityCalculator: affordabilityCalculatorReducer,
  auth: authReducer,
  cashflowTransactions: cashflowTransactionsReducer,
  configs: configsReducer,
  checklist: checklistReducer,
  creditBureau: creditBureauReducer,
  files: filesReducer,
  filters: filtersReducer,
  form: formReducer,
  member: memberReducer,
  members: membersReducer,
  modal: modalReducer,
  notes: notesReducer,
  // notifications: notificationsReducer,
  permissions: permissionsReducer,
  // product: productReducer,
  profile: profileReducer,
  queue: queueReducer,
  // status: statusReducer,
  router: routerReducer,
  search: searchReducer,
  user: userReducer,
  users: usersReducer,
  workbench: workbenchReducer,
});

export default rootReducer;
