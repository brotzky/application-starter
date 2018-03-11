import React from 'react';
import styled from 'styled-components';
import {
  ModalLoading as ModalLoadingWrapper,
  ModalActions,
  ModalBackground,
  ModalLoadingText as ModalLoadingTextWrapper,
} from 'gac-utils/sc';

const handleEscapeKey = showModal => {
  document.onkeydown = e => {
    const event = e || window.event;
    let isEscape = false;
    if ('key' in event) {
      isEscape = event.key === 'Escape';
    } else {
      isEscape = event.keyCode === 27;
    }
    if (isEscape) {
      showModal(false);
    }
  };
};

const ModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.28571rem;
  backface-visibility: hidden;
`;
const ModalDialog = styled.div`
  position: relative;
  width: ${props => (props.fullScreen ? '100%' : 'auto')};
  height: ${props => (props.fullScreen ? '100%' : 'auto')};
  min-height: 250px;
  min-width: 330px;
  border-radius: 2px;
  padding: ${props => (props.noPadding ? '0rem' : '2.25rem')};
  background: #fff;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid #9c9c9c;
`;

const ModalLoading = modalLoadingText => {
  return (
    <ModalLoadingWrapper>
      <ModalLoadingTextWrapper>{modalLoadingText}</ModalLoadingTextWrapper>
      <span className="AuthLoading__dots QuoteInitialLoading__dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </ModalLoadingWrapper>
  );
};

const ModalContent = props => {
  // eslint-disable-line react/no-multi-comp
  handleEscapeKey(props.modalAction);

  return (
    <ModalContainer className="Modal">
      <ModalBackground
        onClick={props.modalAction}
        className="ModalBackground"
      />
      <ModalDialog
        noPadding={props.modalSize}
        fullScreen={props.modalFullscreen}
        className="ModalDialog"
      >
        {props.modalIframeLink && (
          <iframe
            src={props.modalIframeLink}
            className="LoanAgreementModal"
            name="loanAgreementIframe"
          />
        )}
        {props.modalLoadingText &&
          props.modalLoading &&
          ModalLoading(props.modalLoadingText)}
        {/* Render children components if we are nesting components inside <Modal>.*/}
        {props.children ? props.children : null}

        {/* Below are premade components for simple modals where we do not nest in any child components
             * instead we pass props.
             */}
        {props.modalText ? (
          <p style={{ marginBottom: '0' }}>{props.modalText}</p>
        ) : null}
        {props.modalAction ? (
          <ModalActions onClick={props.modalAction}>×</ModalActions>
        ) : null}
      </ModalDialog>
    </ModalContainer>
  );
};

export default ModalContent;
