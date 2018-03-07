import { SHOW_MODAL, HIDE_MODAL, SHOW_MODAL_LOADER } from '../constants';

export function showModal(modalType = null, modalProps = {}) {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}

export function showModalLoader(shouldShowModal) {
  return {
    type: SHOW_MODAL_LOADER,
    payload: shouldShowModal,
  };
}
