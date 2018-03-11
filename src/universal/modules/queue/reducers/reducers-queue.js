import { paginationReducer } from '../../ui/pagination/reducers/reducers-pagination';

import {
  GET_PRODUCT_APPLICATIONS_REQUEST,
  GET_PRODUCT_APPLICATIONS_SUCCESS,
  GET_PRODUCT_APPLICATIONS_FAILURE,
  UPDATE_PRODUCT_APPLICATIONS_REQUEST,
  UPDATE_PRODUCT_APPLICATIONS_SUCCESS,
  UPDATE_PRODUCT_APPLICATIONS_FAILURE,
} from 'grow-actions/product-applications/constants';

import {
  QUEUE_GO_TO_PAGE,
  QUEUE_UPDATE_QUERY_PARAMS,
  QUEUE_UPDATE_ITEMS_PER_PAGE,
  TOGGLE_ACTION_MENU,
  QUEUE_IS_STALE,
  QUEUE_IS_NOT_STALE,
} from '../actions/actions-update-queue-state';

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from 'grow-actions/products/constants';

const initialState = {
  adminSteps: [],
  applications: [],
  products: [],
  errors: [],
  isFetching: false,
  isFetchingProducts: false,
  isLoaded: false,
  isUpdating: false,
  isStale: false,
  queryParams: {
    primaryRep: '',
    state: 'active',
    currentStep: '',
    adminSteps: '',
  },
  resources: [],
  showQueueMenu: '',
};

const buildAdminSteps = products => {
  const steps = [];

  products.map(product => product.adminSteps).filter(element => {
    element.map(step => {
      if (!steps.map(s => s.name).includes(step.name)) {
        steps.push({
          name: step.name,
          prettyName: step.prettyName,
        });
      }
    });
  });

  return steps;
};

export function queueReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isFetchingProducts: true,
      });
    case GET_PRODUCTS_SUCCESS:
      const products = action.payload.data.productDefinitions;
      const adminSteps = buildAdminSteps(products);
      return Object.assign({}, state, {
        products,
        adminSteps,
        isFetchingProducts: false,
        errors: action.payload.errors,
      });
    case GET_PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetchingProducts: false,
      });
    case GET_PRODUCT_APPLICATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_PRODUCT_APPLICATIONS_SUCCESS:
      const { results, resources } = action.payload.data;
      return Object.assign({}, state, {
        applications: results,
        errors: action.payload.errors,
        isFetching: false,
        isLoaded: true,
        resources,
      });
    case GET_PRODUCT_APPLICATIONS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        isLoaded: true,
      });
    case UPDATE_PRODUCT_APPLICATIONS_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      });
    case UPDATE_PRODUCT_APPLICATIONS_SUCCESS:
      return Object.assign({}, state, {
        applications: state.applications.map(application => {
          if (application.id === action.payload.data.application.id) {
            return action.payload.data.application;
          }
          return application;
        }),
        isUpdating: false,
      });
    case UPDATE_PRODUCT_APPLICATIONS_FAILURE:
      return Object.assign({}, state, {
        isUpdating: false,
      });
    case TOGGLE_ACTION_MENU:
      return Object.assign({}, state, {
        showQueueMenu: action.payload,
      });
    case QUEUE_IS_STALE:
      return Object.assign({}, state, {
        isStale: true,
      });
    case QUEUE_IS_NOT_STALE:
      return Object.assign({}, state, {
        isStale: false,
      });
    default:
      return state;
  }
}

export default paginationReducer(queueReducer, {
  GO_TO_PAGE: QUEUE_GO_TO_PAGE,
  UPDATE_QUERY_PARAMS: QUEUE_UPDATE_QUERY_PARAMS,
  UPDATE_ITEMS_PER_PAGE: QUEUE_UPDATE_ITEMS_PER_PAGE,
});
