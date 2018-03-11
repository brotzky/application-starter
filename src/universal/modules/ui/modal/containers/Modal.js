import React from 'react';
import { connect } from 'react-redux';
import { Transition } from '../../transitions/';
import Status from '../../../workbench/status/containers/Status';
import ImageViewer from '../../image-viewer/';
import LegalDocumentViewer from '../../../workbench/application-status/containers/personal-loan/legal-documents/components/LegalDocumentsModal';
import QueueAssignApplicationModal from '../../../queue/containers/QueueAssignApplicationModal';
import ProfilePictureModal from '../../../account/profile/components/ProfilePictureModal';
import ApplicationProfilePdfModal from '../../../workbench/applicant-profile/components/ApplicationProfilePdfModal';
import ApplicationStatusApprovalModal from '../../../workbench/application-status/containers/personal-loan/ApplicationStatusApprovalModal';
import AccountSettingsModal from '../../../workbench/application-status/components/AccountSettingsModal';
import UsersDeleteModal from '../../../account/users/containers/UsersDeleteModal';
import Prompt from '../../components/Prompt/Prompt';

const MODAL_COMPONENTS = {
  ACCOUNT_SETTINGS_MODAL: AccountSettingsModal,
  IMAGE_VIEWER: ImageViewer,
  LEGAL_DOCUMENT_VIEWER: LegalDocumentViewer,
  QUEUE_ASSIGN_APPLICATION_MODAL: QueueAssignApplicationModal,
  PDF_DOCUMENT_VIEWER: ApplicationProfilePdfModal,
  PROFILE_PICTURE_MODAL: ProfilePictureModal,
  RECOMMENDATION_APPROVE_MODAL: ApplicationStatusApprovalModal,
  USERS_DELETE_MODAL: UsersDeleteModal,
  STATUS_MANAGEMENT_MODAL: Status,
  PROMPT_MODAL: Prompt,
};

const Modal = ({ modalType, modalProps }) => {
  const SpecificModal = MODAL_COMPONENTS[modalType];

  // if (modalType) {
  //   document.body.style.overflow = 'hidden';
  // } else {
  //   document.body.removeAttribute('style');
  // }

  return (
    <Transition transitionName="Modal">
      {modalType && <SpecificModal {...modalProps} />}
    </Transition>
  );
};

const mapStateToProps = state => state.modal;

export default connect(mapStateToProps)(Modal);
