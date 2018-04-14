import React from 'react';
import { connect } from 'react-redux';
import { Transition } from '../../transitions/';
import ExampleModal from '../../path/to/yolo';

const MODAL_COMPONENTS = {
  EXAMPLE: ExampleModal,
};

const Modal = ({ modalType, modalProps }) => {
  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <Transition transitionName="Modal">
      {modalType && <SpecificModal {...modalProps} />}
    </Transition>
  );
};

const mapStateToProps = state => state.modal;

export default connect(mapStateToProps)(Modal);
