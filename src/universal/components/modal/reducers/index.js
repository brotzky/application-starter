import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_MODAL_LOADER,
} from '../constants';

const initialState = {
  modalType: null,
  modalLoading: false,
  modalProps: {},
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL_LOADER:
      return Object.assign({}, state, {
        modalLoading: action.payload,
      });
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
