import {
  GET_CHECKLIST_REQUEST,
  GET_CHECKLIST_SUCCESS,
  GET_CHECKLIST_FAILURE,
  GET_CHECKLIST_ITEM_REQUEST,
  GET_CHECKLIST_ITEM_SUCCESS,
  GET_CHECKLIST_ITEM_FAILURE,
  UPDATE_CHECKLIST_ITEM_REQUEST,
  UPDATE_CHECKLIST_ITEM_SUCCESS,
  UPDATE_CHECKLIST_ITEM_FAILURE,
  OVERRIDE_ALL_CHECKLIST_ITEMS_REQUEST,
  OVERRIDE_ALL_CHECKLIST_ITEMS_SUCCESS,
  OVERRIDE_ALL_CHECKLIST_ITEMS_FAILURE,
} from 'grow-actions/checklist/constants';

import {
  SHOW_CHECKLIST_ITEM_DETAILS,
  HIDE_CHECKLIST_ITEM_DETAILS,
  SHOW_CHECKLIST_MODAL_BACKGROUND,
  UPDATE_CHECKLIST_FILTER,
} from '../actions/actions-update-checklist-state';

import { RESET_WORKBENCH } from 'grow-actions/workbench/constants';

const initialState = {
  checklists: [],
  checklistDetails: [],
  collapsedChecklists: [],
  errors: [],
  isFetching: false,
  isFetchingDetails: false,
  isUpdatingDetails: false,
  isOverriding: false,
  filter: {
    primary: 'ALL',
    secondary: 'ALL',
  },
  showChecklistDetails: [],
  showChecklistModalBackground: false,
};

export function checklistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHECKLIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_CHECKLIST_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetching: false,
      });
    case GET_CHECKLIST_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetching: false,
      });
    case OVERRIDE_ALL_CHECKLIST_ITEMS_REQUEST:
      return Object.assign({}, state, {
        isOverriding: true,
      });
    case OVERRIDE_ALL_CHECKLIST_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isOverriding: false,
      });
    case OVERRIDE_ALL_CHECKLIST_ITEMS_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isOverriding: false,
      });
    case GET_CHECKLIST_ITEM_REQUEST:
      return Object.assign({}, state, {
        isFetchingDetails: action.payload,
      });
    case GET_CHECKLIST_ITEM_SUCCESS:
      const checklistDetails = action.payload.data.checklistDetails;
      try {
        return Object.assign({}, state, {
          checklistDetails: Object.assign({}, state.checklistDetails, {
            [checklistDetails[checklistDetails.length - 1]
              .name]: checklistDetails,
          }),
          errors: action.payload.errors,
          isFetchingDetails: false,
        });
      } catch (e) {
        return Object.assign({}, state, {
          errors: action.payload.errors,
          isFetchingDetails: false,
        });
      }
      break;
    case GET_CHECKLIST_ITEM_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetchingDetails: false,
      });
    case UPDATE_CHECKLIST_ITEM_REQUEST:
      return Object.assign({}, state, {
        isUpdatingDetails: true,
      });
    case UPDATE_CHECKLIST_ITEM_SUCCESS:
      const updatedChecklistDetails = action.payload.data.checklists[0];

      return Object.assign({}, state, {
        checklistDetails: Object.assign({}, state.checklistDetails, {
          [updatedChecklistDetails.name]: action.payload.data.checklists,
        }),
        checklists: state.checklists.map(checklist => {
          if (checklist.id === updatedChecklistDetails.id) {
            return updatedChecklistDetails;
          }

          return checklist;
        }),
        errors: action.payload.errors,
        isUpdatingDetails: false,
      });
    case UPDATE_CHECKLIST_ITEM_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isUpdatingDetails: false,
      });
    case UPDATE_CHECKLIST_FILTER:
      return Object.assign({}, state, {
        filter: action.payload,
      });
    case RESET_WORKBENCH:
    case 'RESET_CHECKLIST':
      return initialState;
    case SHOW_CHECKLIST_ITEM_DETAILS:
      return Object.assign({}, state, {
        showChecklistDetails: [...state.showChecklistDetails, action.payload],
      });
    case HIDE_CHECKLIST_ITEM_DETAILS:
      return Object.assign({}, state, {
        showChecklistDetails: state.showChecklistDetails.filter(
          c => c !== action.payload,
        ),
      });
    case SHOW_CHECKLIST_MODAL_BACKGROUND:
      return Object.assign({}, state, {
        showChecklistModalBackground: action.payload,
      });
    default:
      return state;
  }
}

export default checklistReducer;
