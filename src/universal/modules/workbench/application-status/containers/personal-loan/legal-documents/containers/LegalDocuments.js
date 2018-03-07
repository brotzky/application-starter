import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { productApplicationStepProceed } from 'grow-actions/product-applications/product-applications-steps';
import { getProductApplicationAgreement } from 'grow-actions/agreement/agreement';
import {
  showModal,
  hideModal,
} from '../../../../../../ui/modal/actions/actions-modal';
import { Button } from '../../../../../../ui/components';
import { FadeIn } from '../../../../../../ui/transitions';
import LegalDocumentsOverview from '../components/LegalDocumentsOverview';
import LegalDocumentsErrorhandler from '../components/LegalDocumentsErrorHandler';

const LegalDocumentFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3rem;

  & > div {
    width: 100%;
  }
`;

class LegalDocuments extends Component {
  state = {
    isSubmitting: false,
  };

  componentDidMount() {
    const { dispatch, member, shouldGetLegalDocuments, workbench } = this.props;
    if (shouldGetLegalDocuments) {
      dispatch(getProductApplicationAgreement(member.id, workbench.id));
    }
  }

  componentWillUpdate(nextProps) {
    const { dispatch, member, workbench } = this.props;

    /**
     * Once an applicaiton is approved we want to make a call for the generated
     * legal documents so the GAC user can see them before sending them.
     */
    if (
      this.props.workbench.currentStep === 'admin-review' &&
      nextProps.workbench.currentStep === 'approved'
    ) {
      dispatch(getProductApplicationAgreement(member.id, workbench.id));
    }
  }

  handleLoanAgreementClick = async () => {
    const { dispatch, member, workbench } = this.props;
    const step = { stepAction: 'SEND_LOAN_AGREEMENT' };

    this.setState({ isSubmitting: 'true' });
    await dispatch(
      productApplicationStepProceed(member.id, workbench.id, step),
    );
    await dispatch(getProductApplicationAgreement(member.id, workbench.id));
    this.setState({ isSubmitting: false });
  };

  handleLegalDocumentModalClick = base64Pdf => {
    const { dispatch } = this.props;

    dispatch(
      showModal('LEGAL_DOCUMENT_VIEWER', {
        base64Pdf,
        closeLegalModal: () => dispatch(hideModal()),
      }),
    );
  };

  render() {
    const { member, workbench } = this.props;

    // Dirty, but will clean this up when re-doing step validation
    const canSendLoanAgreements = workbench.currentStep === 'approved';

    return (
      <div>
        <Button
          onClick={this.handleLoanAgreementClick}
          appearance="secondary"
          size="large"
          disabled={!canSendLoanAgreements}
          permission="SEND_LEGAL_DOCUMENTS"
          isSubmitting={this.state.isSubmitting}
          id="SendLoanDocuments"
          text="Send"
        />
        <LegalDocumentFlex>
          <LegalDocumentsErrorhandler
            member={member}
            workbench={workbench}
            error={workbench.errors[0]}
          />
          <FadeIn component="div">
            {workbench.isFetchingAgreements ? (
              <div>Loading legal documents...</div>
            ) : (
              workbench.agreements.length > 0 &&
              workbench.agreements.map(doc => (
                <LegalDocumentsOverview
                  key={doc.type}
                  doc={doc}
                  openDocument={() =>
                    this.handleLegalDocumentModalClick(doc.base64Pdf)}
                />
              ))
            )}
          </FadeIn>
        </LegalDocumentFlex>
      </div>
    );
  }
}

LegalDocuments.propTypes = {
  member: PropTypes.string.isRequired,
  workbench: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
    ]),
  ).isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  shouldGetLegalDocuments:
    state.workbench.currentStep === 'approved' ||
    state.workbench.currentStep === 'pre-closing' ||
    state.workbench.currentStep === 'closing' ||
    state.workbench.currentStep === 'serving',
  member: state.member.member,
});

export default connect(mapStateToProps)(LegalDocuments);
