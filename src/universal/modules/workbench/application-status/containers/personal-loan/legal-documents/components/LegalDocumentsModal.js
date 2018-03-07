import React from 'react';
import ModalContent from '../../../../../../ui/modal/components/ModalContent';

const LegalDocumentViewer = props => (
  <ModalContent
    modalAction={props.closeLegalModal}
    modalFullscreen={true}
    modalSize="noPadding"
  >
    <iframe
      height="100%"
      width="100%"
      style={{ border: 'none' }}
      title="Legal document"
      type="application/pdf"
      src={`data:application/pdf;base64,${props.base64Pdf}`}
    />
  </ModalContent>
);

export default LegalDocumentViewer;
