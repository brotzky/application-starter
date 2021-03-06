import React from 'react';
import { connect } from 'react-redux';
import { Transition } from '@components';
// import ExampleModal from '../../path/to/yolo';

const MODAL_COMPONENTS = {
  EXAMPLE: <div>Modal</div>,
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
