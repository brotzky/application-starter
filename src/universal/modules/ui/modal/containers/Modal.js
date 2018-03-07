import React from 'react';
import { connect } from 'react-redux';
import { Transition } from '../../transitions/';

import ImageViewer from '../../image-viewer/';
import LegalDocumentViewer from '../../../workbench/application-status/containers/personal-loan/legal-documents/components/LegalDocumentsModal';
import LoanAgreementModal from '../../../product/loan-book/components/LoanAgreementModal';
import PersonalLoanReturnedChangePaymentStateModal from '../../../product/personal-loan/containers/PersonalLoanReturnedChangePaymentStateModal';
import ProfilePictureModal from '../../../account/profile/components/ProfilePictureModal';
import ApplicationProfilePdfModal from '../../../workbench/applicant-profile/components/ApplicationProfilePdfModal';
import QueueAssignApplicationModal from '../../../queue/containers/QueueAssignApplicationModal';
import RecommendationApproveModal from '../../../workbench/recommendation/components/RecommendationApproveModal';
import RecommendationDeclineModal from '../../../workbench/recommendation/components/RecommendationDeclineModal';
import StatusModal from '../../../workbench/status/containers/StatusModal';
import AccountSettingsModal from '../../../workbench/application-status/components/AccountSettingsModal';
import UsersDeleteModal from '../../../account/users/containers/UsersDeleteModal';

const MODAL_COMPONENTS = {
  ACCOUNT_SETTINGS_MODAL: AccountSettingsModal,
  IMAGE_VIEWER: ImageViewer,
  LEGAL_DOCUMENT_VIEWER: LegalDocumentViewer,
  LOAN_AGREEMENT_MODAL: LoanAgreementModal,
  PDF_DOCUMENT_VIEWER: ApplicationProfilePdfModal,
  PERSONAL_LOAN_RETURNED_CHANGE_PAYMENT_STATE_MODAL: PersonalLoanReturnedChangePaymentStateModal,
  PROFILE_PICTURE_MODAL: ProfilePictureModal,
  QUEUE_ASSIGN_APPLICATION_MODAL: QueueAssignApplicationModal,
  RECOMMENDATION_APPROVE_MODAL: RecommendationApproveModal,
  RECOMMENDATION_DECLINE_MODAL: RecommendationDeclineModal,
  STATUS_MODAL: StatusModal,
  USERS_DELETE_MODAL: UsersDeleteModal,
};

const Modal = ({ modalType, modalProps }) => {
  const SpecificModal = MODAL_COMPONENTS[modalType];

  if (typeof document !== 'undefined') {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }

  return (
    <Transition transitionName="Modal">
      {modalType && <SpecificModal {...modalProps} />}
    </Transition>
  );
};

const mapStateToProps = state => state.modal;

export default connect(mapStateToProps)(Modal);
