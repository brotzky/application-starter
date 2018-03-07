import { paginationReducer } from '../../ui/pagination/reducers/reducers-pagination';

import {
  GET_MEMBER_NOTES_REQUEST,
  GET_MEMBER_NOTES_SUCCESS,
  GET_MEMBER_NOTES_FAILURE,
  CREATE_MEMBER_NOTE_REQUEST,
  CREATE_MEMBER_NOTE_SUCCESS,
  CREATE_MEMBER_NOTE_FAILURE,
  UPDATE_MEMBER_NOTE_REQUEST,
  UPDATE_MEMBER_NOTE_SUCCESS,
  UPDATE_MEMBER_NOTE_FAILURE,
} from 'grow-actions/member/constants';

import {
  EDIT_NOTE,
  NOTES_GO_TO_PAGE,
  NOTES_UPDATE_QUERY_PARAMS,
} from '../actions/actions-update-member-state';

const initialState = {
  editNoteId: '',
  errors: [],
  isCreating: false,
  isFetching: false,
  isUpdating: false,
  list: [],
  queryParams: {
    start: 0,
    end: 3,
  },
  resources: [],
};

export function notesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBER_NOTES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_MEMBER_NOTES_SUCCESS:
      return Object.assign({}, state, {
        errors: [],
        isFetching: false,
        list: action.payload.data.results,
        resources: action.payload.data.resources,
      });
    case GET_MEMBER_NOTES_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isFetching: false,
        list: [],
      });
    case CREATE_MEMBER_NOTE_REQUEST:
      return Object.assign({}, state, {
        isCreating: true,
      });
    case CREATE_MEMBER_NOTE_SUCCESS:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isCreating: false,
        list: [action.payload.data.note, ...state.list],
      });
    case CREATE_MEMBER_NOTE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isCreating: false,
      });
    case EDIT_NOTE:
      return Object.assign({}, state, {
        editNoteId: action.payload,
      });
    case UPDATE_MEMBER_NOTE_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      });
    case UPDATE_MEMBER_NOTE_SUCCESS:
      return Object.assign({}, state, {
        editNoteId: '',
        errors: [...state.errors, ...action.payload.errors],
        isUpdating: false,
        list: state.list.map(item => {
          if (item.id === action.payload.data.note.id) {
            return action.payload.data.note;
          }
          return item;
        }),
      });
    case UPDATE_MEMBER_NOTE_FAILURE:
      return Object.assign({}, state, {
        errors: [...state.errors, ...action.payload.errors],
        isUpdating: false,
      });
    default:
      return state;
  }
}

export default paginationReducer(notesReducer, {
  GO_TO_PAGE: NOTES_GO_TO_PAGE,
  UPDATE_QUERY_PARAMS: NOTES_UPDATE_QUERY_PARAMS,
});
