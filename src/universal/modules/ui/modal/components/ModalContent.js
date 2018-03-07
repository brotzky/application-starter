import React from 'react';

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

const ModalLoading = modalLoadingText => {
  return (
    <div className="Modal__loading">
      <span className="Modal__loading-text">{modalLoadingText}</span>
      <span className="AuthLoading__dots QuoteInitialLoading__dots">
        <span>.</span><span>.</span><span>.</span>
      </span>
    </div>
  );
};

const ModalContent = props => { // eslint-disable-line react/no-multi-comp
  handleEscapeKey(props.modalAction);

  return (
    <div className={`Modal ${props.modalStatus ? `Modal--${props.modalStatus}` : ''} ${props.modalFullscreen ? '' : 'Modal--not-fullscreen'}`}>
      <div className="Modal__background" onClick={props.modalAction}></div>
      <div className={`Modal__dialog ${props.modalSize ? `Modal__dialog--${props.modalSize}` : ''}`}>
        <div className={`Modal__body ${props.children ? 'Modal__body--no-margin' : ''}`}>
          { props.modalIframeLink && <iframe src={props.modalIframeLink} className="LoanAgreementModal" name="loanAgreementIframe" /> }
          { props.modalLoadingText && props.modalLoading && ModalLoading(props.modalLoadingText) }
          { /* Render children components if we are nesting components inside <Modal>.*/ }
          {props.children ? props.children : null}

          { /* Below are premade components for simple modals where we do not nest in any child components
             * instead we pass props.
             */ }
          {props.modalText ? <p className="Modal__text">{props.modalText}</p> : null}
        </div>
        {
          props.modalAction
          ? <div onClick={props.modalAction} className="Modal__actions">×</div>
          : null
        }
      </div>
    </div>
  );
};

export default ModalContent;
