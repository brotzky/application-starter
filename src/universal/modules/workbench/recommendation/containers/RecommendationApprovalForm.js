import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import { FormButton } from '../../../forms/fields/FormButton';
import { getApprovalComment } from 'grow-actions/recommendation/recommendation';

import RecommendationAllowed from '../components/RecommendationAllowed';
import RecommendationTextLoading from '../components/RecommendationTextLoading';

const fieldProps = { className: 'RecommendationForm' };

class RecommendationApprovalForm extends Component {
  componentDidMount() {
    const { dispatch, recommendation, workbenchId } = this.props;
    if (!recommendation.approvalText) {
      dispatch(getApprovalComment(workbenchId)).then(response =>
        dispatch(
          initialize('approvalComments', {
            approvalText: response.payload.data.comment,
          }),
        ),
      );
    }
  }

  canEdit() {
    const { workbench, recommendation } = this.props;
    return (
      (workbench.currentStep === 'verification' ||
        workbench.currentStep === 'underwriting') &&
      workbench.state === 'active' &&
      recommendation.commentText
    );
  }

  render() {
    const { handleSubmit, recommendation, workbench } = this.props;

    return (
      <form className="RecommendationApprovalForm" onSubmit={handleSubmit}>
        <header className="RecommendationFormHeader">
          <h2 className="RecommendationFormHeader__heading">Approval Note</h2>
        </header>
        <div className="RecommendationSubHeader">
          <p>
            Use the space below to write an approval or decline note. Once you
            have submitted your note, head over to the next step to approve or
            decline the application. Once you hit approve, an electronic loan
            agreement will automatically be sent to your member. If you are
            declining the application, by clicking the decline button a pop up
            list of decline reasons will appear. Select one of these to complete
            the application.
          </p>
        </div>
        <div className="RecommendationFormContent">
          <RecommendationTextLoading isFetching={recommendation.isFetching} />
          <Field
            {...fieldProps}
            name="approvalText"
            component="textarea"
            disabled={!workbench.primaryRep || !this.canEdit()}
            placeholder={
              recommendation.isFetching ? '' : 'Write your approval note here'
            }
            className="RecommendationFormTextarea"
          />
        </div>
        <div className="RecommendationFormButtonWrapper">
          <Field
            name="submitButton"
            component={FormButton}
            buttonText="Save Note"
            isSubmitting={recommendation.isSubmittingApproval}
            type="submit"
            disabled={!workbench.primaryRep || !this.canEdit()}
            permission="EDIT_UNDERWRITING_NOTE"
            {...fieldProps}
          />
          <RecommendationAllowed
            workbench={workbench}
            canEdit={this.canEdit()}
          />
        </div>
      </form>
    );
  }
}

RecommendationApprovalForm = reduxForm({
  form: 'approvalComments',
  destroyOnUnmount: false,
})(RecommendationApprovalForm);

RecommendationApprovalForm = connect(state => ({
  workbench: state.workbench,
  recommendation: state.recommendation,
  user: state.user,
}))(RecommendationApprovalForm);

export default RecommendationApprovalForm;
