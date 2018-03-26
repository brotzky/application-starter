import React from 'react';
import { connect } from 'react-redux';
import { Transition } from '../../transitions/';
import AccountSettingsModal from '../../../workbench/application-status/components/AccountSettingsModal';
import ApplicationProfilePdfModal from '../../../workbench/applicant-profile/components/ApplicationProfilePdfModal';
import ApplicationStatusApprovalModal from '../../../workbench/application-status/containers/personal-loan/ApplicationStatusApprovalModal';
import ChecklistResolutionModal from '../../../workbench/checklist/components/ChecklistResolutionModal';
import ImageViewer from '../../image-viewer/';
import LegalDocumentViewer from '../../../workbench/application-status/containers/personal-loan/legal-documents/components/LegalDocumentsModal';
import ProfilePictureModal from '../../../account/profile/components/ProfilePictureModal';
import Prompt from '../../components/Prompt/Prompt';
import QueueAssignApplicationModal from '../../../queue/containers/QueueAssignApplicationModal';
import Status from '../../../workbench/status/containers/Status';
import UsersDeleteModal from '../../../account/users/containers/UsersDeleteModal';

const MODAL_COMPONENTS = {
  ACCOUNT_SETTINGS_MODAL: AccountSettingsModal,
  CHECKLIST_RESOLUTION_MODAL: ChecklistResolutionModal,
  IMAGE_VIEWER: ImageViewer,
  LEGAL_DOCUMENT_VIEWER: LegalDocumentViewer,
  QUEUE_ASSIGN_APPLICATION_MODAL: QueueAssignApplicationModal,
  PDF_DOCUMENT_VIEWER: ApplicationProfilePdfModal,
  PROFILE_PICTURE_MODAL: ProfilePictureModal,
  PROMPT_MODAL: Prompt,
  RECOMMENDATION_APPROVE_MODAL: ApplicationStatusApprovalModal,
  STATUS_MANAGEMENT_MODAL: Status,
  USERS_DELETE_MODAL: UsersDeleteModal,
};

const Modal = ({ modalType, modalProps }) => {
  const SpecificModal = MODAL_COMPONENTS[modalType];

  // This needs to be refactored to handle SSR
  // todo(Dennis)
  //
  // if (typeof window !== 'undefined') {
  //   if (modalType) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.removeAttribute('style');
  //   }
  // }

  return (
    <Transition transitionName="Modal">
      {modalType && <SpecificModal {...modalProps} />}
    </Transition>
  );
};

const mapStateToProps = state => state.modal;

export default connect(mapStateToProps)(Modal);
