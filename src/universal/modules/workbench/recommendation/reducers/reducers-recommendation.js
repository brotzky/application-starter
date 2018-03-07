import {
  RESET_WORKBENCH,
} from 'grow-actions/workbench/constants';

import {
    UPDATE_RECOMMENDATION_NOTE_REQUEST,
    UPDATE_RECOMMENDATION_NOTE_SUCCESS,
    UPDATE_RECOMMENDATION_NOTE_FAILURE,
    UPDATE_APPROVAL_NOTE_REQUEST,
    UPDATE_APPROVAL_NOTE_SUCCESS,
    UPDATE_APPROVAL_NOTE_FAILURE,
    APPROVE_LOAN_REQUEST,
    APPROVE_LOAN_SUCCESS,
    APPROVE_LOAN_FAILURE,
    GET_RECOMMENDATION_COMMENT_REQUEST,
    GET_RECOMMENDATION_COMMENT_SUCCESS,
    GET_RECOMMENDATION_COMMENT_FAILURE,
    GET_RECOMMENDATION_APPROVAL_REQUEST,
    GET_RECOMMENDATION_APPROVAL_SUCCESS,
    GET_RECOMMENDATION_APPROVAL_FAILURE,
} from 'grow-actions/recommendation/constants';

const initialState = {
  commentText: '',
  approvalText: '',
  isFetching: true,
  isSubmittingApproval: false,
  isSubmittingRecommendation: false,
  errors: [],
};

export function recommendationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECOMMENDATION_COMMENT_REQUEST:
    case GET_RECOMMENDATION_APPROVAL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case APPROVE_LOAN_REQUEST:
      return Object.assign({}, state, {
        isApproving: true,
      });
    case APPROVE_LOAN_SUCCESS:
    case APPROVE_LOAN_FAILURE:
      return Object.assign({}, state, {
        isApproving: false,
      });
    case UPDATE_RECOMMENDATION_NOTE_REQUEST:
      return Object.assign({}, state, {
        isSubmittingRecommendation: true,
      });
    case UPDATE_RECOMMENDATION_NOTE_SUCCESS:
      return Object.assign({}, state, {
        commentText: action.payload.data.comment,
        isSubmittingRecommendation: false,
      });
    case UPDATE_RECOMMENDATION_NOTE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isSubmittingRecommendation: false,
      });
    case UPDATE_APPROVAL_NOTE_REQUEST:
      return Object.assign({}, state, {
        isSubmittingApproval: true,
      });
    case UPDATE_APPROVAL_NOTE_SUCCESS:
      return Object.assign({}, state, {
        approvalText: action.payload.data.comment,
        isSubmittingApproval: false,
      });
    case UPDATE_APPROVAL_NOTE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isSubmittingApproval: false,
      });
    case GET_RECOMMENDATION_APPROVAL_SUCCESS:
      return Object.assign({}, state, {
        approvalText: action.payload.data.comment,
        isFetching: false,
      });
    case GET_RECOMMENDATION_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        commentText: action.payload.data.comment,
        isFetching: false,
      });
    case GET_RECOMMENDATION_APPROVAL_FAILURE:
    case GET_RECOMMENDATION_COMMENT_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
      });
    case RESET_WORKBENCH:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export default recommendationReducer;
