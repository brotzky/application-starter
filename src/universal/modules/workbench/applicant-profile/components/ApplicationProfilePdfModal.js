import React from 'react';
import ModalContent from '../../../ui/modal/components/ModalContent';

const ApplicationProfilePdfModal = ({ image, closePdfViewer }) => (
  <ModalContent
    modalAction={closePdfViewer}
    modalFullscreen={true}
    modalSize="noPadding"
  >
    <iframe
      height="100%"
      width="100%"
      style={{ border: 'none' }}
      title={image.name}
      type="application/pdf"
      src={image.preview}
    />
  </ModalContent>
);

export default ApplicationProfilePdfModal;
