import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import { getRecommendationComment } from 'grow-actions/recommendation/recommendation';
import { FormButton } from '../../../forms/fields/FormButton';

import RecommendationAllowed from '../components/RecommendationAllowed';
import RecommendationTextLoading from '../components/RecommendationTextLoading';

const fieldProps = { className: 'RecommendationForm' };

class RecommendationCommentsForm extends Component {
  componentDidMount() {
    const { dispatch, recommendation, workbenchId } = this.props;
    if (!recommendation.commentText) {
      dispatch(getRecommendationComment(workbenchId)).then(response =>
        dispatch(
          initialize('recommendationComments', {
            commentText: response.payload.data.comment,
          }),
        ),
      );
    }
  }

  canEdit() {
    const { workbench } = this.props;
    return (
      workbench.currentStep === 'verification' ||
      (workbench.currentStep === 'underwriting' && workbench.state === 'active')
    );
  }

  render() {
    const { handleSubmit, recommendation, workbench, user } = this.props;

    return (
      <form className="RecommendationCommentsForm" onSubmit={handleSubmit}>
        <header className="RecommendationFormHeader">
          <h2 className="RecommendationFormHeader__heading">Recommendation</h2>
        </header>
        <div className="RecommendationSubHeader">
          <p>
            Use the space below to write a recommendation for{' '}
            {workbench.creator.firstName}
            's Personal Loan application. Once you have submitted your note the
            application will be ready for approval.
          </p>
        </div>
        <div className="RecommendationFormContent">
          <RecommendationTextLoading isFetching={recommendation.isFetching} />
          <Field
            {...fieldProps}
            name="commentText"
            component="textarea"
            disabled={!workbench.primaryRep || !this.canEdit()}
            placeholder={
              recommendation.isFetching ? '' : 'Write your recommendation here'
            }
            className="RecommendationFormTextarea"
          />
        </div>
        <div className="RecommendationFormButtonWrapper">
          <Field
            name="submitButton"
            component={FormButton}
            buttonText="Save Note"
            isSubmitting={recommendation.isSubmittingRecommendation}
            disabled={workbench.primaryRep !== user.email || !this.canEdit()}
            permission="EDIT_RECOMMENDATION_COMMENTS"
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

RecommendationCommentsForm = reduxForm({
  form: 'recommendationComments',
  destroyOnUnmount: false,
})(RecommendationCommentsForm);

RecommendationCommentsForm = connect(state => ({
  workbench: state.workbench,
  recommendation: state.recommendation,
  user: state.user,
}))(RecommendationCommentsForm);

export default RecommendationCommentsForm;
