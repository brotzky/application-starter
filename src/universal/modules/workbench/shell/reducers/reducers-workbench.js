import {
  GET_WORKBENCH_REQUEST,
  GET_WORKBENCH_SUCCESS,
  GET_WORKBENCH_FAILURE,
  UPDATE_APPLICATION_STATE,
  RESET_WORKBENCH,
  UPDATE_LAST_DECLINED_TRANSITIONS,
  UPDATE_LAST_ON_HOLD_TRANSITIONS,
  UPDATE_LAST_FRAUD_TRANSITIONS,
  UPDATE_LAST_ACTIVE_TRANSITIONS,
  UPDATE_LAST_CANCELLED_TRANSITIONS,
} from 'grow-actions/workbench/constants';

import {
  UPDATE_PRODUCT_APPLICATIONS_SUCCESS,
  PROCEED_PRODUCT_APPLICATIONS_STEPS_REQUEST,
  PROCEED_PRODUCT_APPLICATIONS_STEPS_SUCCESS,
  PROCEED_PRODUCT_APPLICATIONS_STEPS_FAILURE,
  PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_REQUEST,
  PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_SUCCESS,
  PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_FAILURE,
} from 'grow-actions/product-applications/constants';

import {
  GET_PRODUCT_APPLICATION_AGREEMENT_REQUEST,
  GET_PRODUCT_APPLICATION_AGREEMENT_SUCCESS,
  GET_PRODUCT_APPLICATION_AGREEMENT_FAILURE,
} from 'grow-actions/agreement/constants';

import {
  GET_MEMBER_PRODUCT_APPLICATION_METADATA_REQUEST,
  GET_MEMBER_PRODUCT_APPLICATION_METADATA_SUCCESS,
  GET_MEMBER_PRODUCT_APPLICATION_METADATA_FAILURE,
  UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_REQUEST,
  UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_SUCCESS,
  UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_FAILURE,
} from 'grow-actions/member/constants';

import {
  GET_QUOTE_REQUEST,
  GET_QUOTE_SUCCESS,
  GET_QUOTE_FAILURE,
  UPDATE_QUOTE,
} from 'grow-actions/quote/constants';

const initialState = {
  agreements: [],
  config: {},
  configIsLoaded: false,
  creator: {},
  errors: [],
  metadata: {},
  id: '',
  invites: [],
  isFetching: true,
  isFetchingAgreements: false,
  isFetchingMetadata: true,
  isFetchingQuote: false,
  isUpdatingMetadata: false,
  isUpdatingApplication: false,
  isLoaded: false,
  otherUsers: [],
  primaryRep: {},
  quote: {},
  adminSteps: {},
  showApplicantProfileNav: true,
  state: '',
  transitions: {
    declined: { reasons: [], note: '' },
    onHold: { reasons: [], note: '' },
    fraud: { reasons: [], note: '' },
  },
};

export function workbenchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKBENCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
      });
    case GET_WORKBENCH_SUCCESS:
    case PROCEED_PRODUCT_APPLICATIONS_STEPS_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data.application,
        creator: action.payload.data.application.creator,
        errors: action.payload.errors,
        isFetching: false,
        isLoaded: true,
      });
    case GET_WORKBENCH_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors || [],
        isFetching: false,
      });

    case GET_QUOTE_REQUEST:
      return Object.assign({}, state, {
        isFetchingQuote: true,
      });
    case GET_QUOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingQuote: false,
      });
    case GET_QUOTE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors || [],
        isFetchingQuote: false,
      });

    case UPDATE_QUOTE:
      return Object.assign({}, state, {
        // if there's incomplete quote metadata, need a fallback instead of data = null
        quote: action.payload.data || {},
      });

    case GET_MEMBER_PRODUCT_APPLICATION_METADATA_REQUEST:
      return Object.assign({}, state, {
        isFetchingMetadata: true,
      });
    case GET_MEMBER_PRODUCT_APPLICATION_METADATA_SUCCESS:
      return Object.assign({}, state, {
        metadata: action.payload.data.metadata,
        isFetchingMetadata: false,
        metadataIsLoaded: true,
      });
    case GET_MEMBER_PRODUCT_APPLICATION_METADATA_FAILURE:
    case PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors || [],
        isUpdatingApplication: false,
      });
    case PROCEED_PRODUCT_APPLICATIONS_STEPS_REQUEST:
    case PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_REQUEST:
      return Object.assign({}, state, {
        isUpdatingApplication: true,
      });
    case PROCEED_PRODUCT_APPLICATIONS_STEPS_FAILURE:
      return Object.assign({}, state, {
        isUpdatingApplication: false,
      });
    case PROCEED_PRODUCT_APPLICATIONS_ADMIN_STEPS_SUCCESS:
      return Object.assign({}, state, {
        adminSteps: action.payload.data.adminSteps,
        isUpdatingApplication: false,
      });
    case UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_REQUEST:
      return Object.assign({}, state, {
        isUpdatingMetadata: true,
      });
    case UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_SUCCESS:
      return Object.assign({}, state, {
        isUpdatingMetadata: false,
      });
    case UPDATE_MEMBER_PRODUCT_APPLICATION_METADATA_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors || [],
        isUpdatingMetadata: false,
      });
    case UPDATE_PRODUCT_APPLICATIONS_SUCCESS:
      return Object.assign({}, state, {
        primaryRep: action.payload.data.application.primaryRep,
      });
    case GET_PRODUCT_APPLICATION_AGREEMENT_REQUEST:
      return Object.assign({}, state, {
        isFetchingAgreements: true,
        errors: [],
      });
    case GET_PRODUCT_APPLICATION_AGREEMENT_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
        isFetchingAgreements: false,
        errors: [],
      });
    case GET_PRODUCT_APPLICATION_AGREEMENT_FAILURE:
      return Object.assign({}, state, {
        ...action.payload,
        isFetchingAgreements: false,
      });

    // for state transition changes
    case UPDATE_APPLICATION_STATE:
      return Object.assign({}, state, {
        state: action.payload.state,
      });
    case UPDATE_LAST_DECLINED_TRANSITIONS:
      return Object.assign({}, state, {
        transitions: {
          onHold: { reasons: [], note: '' },
          fraud: { reasons: [], note: '' },
          declined: action.payload,
          cancelled: { reasons: [], note: '' },
        },
      });
    case UPDATE_LAST_ON_HOLD_TRANSITIONS:
      return Object.assign({}, state, {
        transitions: {
          declined: { reasons: [], note: '' },
          fraud: { reasons: [], note: '' },
          onHold: action.payload,
          cancelled: { reasons: [], note: '' },
        },
      });
    case UPDATE_LAST_FRAUD_TRANSITIONS:
      return Object.assign({}, state, {
        transitions: {
          onHold: { reasons: [], note: '' },
          declined: { reasons: [], note: '' },
          fraud: action.payload,
          cancelled: { reasons: [], note: '' },
        },
      });
    case UPDATE_LAST_ACTIVE_TRANSITIONS:
    case UPDATE_LAST_CANCELLED_TRANSITIONS: //TODO update reasons for cancelled transitions
      return Object.assign({}, state, {
        transitions: {
          declined: { reasons: [], note: '' },
          onHold: { reasons: [], note: '' },
          fraud: { reasons: [], note: '' },
          cancelled: { reasons: [], note: '' },
        },
      });
    case RESET_WORKBENCH:
      return Object.assign({}, state, {
        id: '',
        metadata: {},
        primaryRep: {},
        isLoaded: false,
      });
    case 'TOGGLE_APPLICANT_PROFILE_NAV':
      return Object.assign({}, state, {
        showApplicantProfileNav: action.payload,
      });
    default:
      return state;
  }
}

export default workbenchReducer;
