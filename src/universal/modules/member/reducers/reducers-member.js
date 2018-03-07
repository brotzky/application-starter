import {
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  GET_MEMBER_PROFILE_REQUEST,
  GET_MEMBER_PROFILE_SUCCESS,
  GET_MEMBER_PROFILE_FAILURE,
  UPDATE_MEMBER_PROFILE_REQUEST,
  UPDATE_MEMBER_PROFILE_SUCCESS,
  UPDATE_MEMBER_PROFILE_FAILURE,
  SYNC_MEMBER_FROM_MEMORY_SUCCESS,
  UNLOCK_MEMBERS_PROFILE_SUCCESS,
} from 'grow-actions/member/constants';

import {
  UPDATE_PRODUCT_APPLICATIONS_REQUEST,
  UPDATE_PRODUCT_APPLICATIONS_SUCCESS,
  UPDATE_PRODUCT_APPLICATIONS_FAILURE,
} from 'grow-actions/product-applications/constants';

import { GET_WORKBENCH_SUCCESS } from 'grow-actions/workbench/constants';

import {
  EDIT_PROFILE,
  TOGGLE_NOTE_COMPOSER,
} from '../actions/actions-update-member-state';

import { TOGGLE_ACTION_MENU } from '../../queue/actions/actions-update-queue-state';

const initialState = {
  editProfile: '',
  errors: [],
  files: [],
  isFetching: false,
  isFetchingProfiles: false,
  imageViewer: {},
  isMemberLoaded: false,
  isProfilesLoaded: false,
  isUpdating: false,
  member: {},
  productApplications: [],
  profileData: {},
  profiles: [],
  showNoteComposer: false,
  showProductApplicationMenu: false,
};

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_MEMBER_FROM_MEMORY_SUCCESS: {
      return Object.assign({}, state, {
        ...action.payload.data,
      });
    }
    case GET_MEMBER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        member: {},
      });
    case GET_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isFetching: false,
        isMemberLoaded: true,
        ...action.payload.data,
      });
    case GET_MEMBER_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isFetching: false,
        isMemberLoaded: true,
        member: {},
        profiles: [],
      });
    case GET_MEMBER_PROFILE_REQUEST:
      return Object.assign({}, state, {
        isFetchingProfiles: true,
        isProfilesLoaded: false,
      });
    case GET_MEMBER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isFetchingProfiles: false,
        isProfilesLoaded: true,
        ...action.payload.data,
      });
    case GET_MEMBER_PROFILE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isFetchingProfiles: false,
        profileData: {},
        profiles: [],
      });
    case UPDATE_MEMBER_PROFILE_REQUEST:
    case UPDATE_PRODUCT_APPLICATIONS_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      });
    case UPDATE_MEMBER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isUpdating: false,
        profileData: action.payload.data.profileData,
      });
    case UPDATE_MEMBER_PROFILE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isUpdating: false,
      });
    case UPDATE_PRODUCT_APPLICATIONS_SUCCESS:
    case GET_WORKBENCH_SUCCESS:
      return Object.assign({}, state, {
        productApplications: state.productApplications.map(application => {
          if (application.id === action.payload.data.application.id) {
            return action.payload.data.application;
          }
          return application;
        }),
        isUpdating: false,
      });
    case UPDATE_PRODUCT_APPLICATIONS_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isUpdating: false,
      });
    case TOGGLE_ACTION_MENU:
      return Object.assign({}, state, {
        showProductApplicationMenu: action.payload,
      });
    case TOGGLE_NOTE_COMPOSER:
      return Object.assign({}, state, {
        showNoteComposer: action.payload,
      });
    case EDIT_PROFILE:
      return Object.assign({}, state, {
        editProfile: action.payload,
      });
    case 'VIEW_IMAGE':
      return Object.assign({}, state, {
        imageViewer: action.payload,
      });
    case 'CLOSE_IMAGE':
      return Object.assign({}, state, {
        imageViewer: {},
      });
    case 'RESET_MEMBER':
      return initialState;
    case UNLOCK_MEMBERS_PROFILE_SUCCESS: {
      return Object.assign([],state, {
        member : action.payload.data
      })
    }
    default:
      return state;
  }
}
