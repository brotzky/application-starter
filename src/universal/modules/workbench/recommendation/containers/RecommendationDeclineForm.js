import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, stopSubmit } from 'redux-form';
import { approvalDecision } from 'grow-actions/recommendation/recommendation';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { Checkbox, FormButton } from '../../../forms/fields/';
import { FadeIn } from '../../../ui/transitions/';

const validate = values => {
  const errors = {};

  if (!values.length) {
    errors.error = 'You must select a decline reason';
  }

  return errors;
};

class RecommendationDeclineForm extends Component {
  constructor(props) {
    super(props);
    this.state = { submitError: false };
  }

  handleDeclineSubmit = data => {
    const { dispatch, workbench } = this.props;
    const apiBody = {
      action: 'DECLINE',
      declineReasons: Object.keys(data).filter(
        node => node !== 'declineOtherComment',
      ),
      otherReason: data.declineOtherComment,
    };

    if (
      Object.keys(data).length &&
      Object.keys(data).filter(node => data[node])
    ) {
      dispatch(
        notificationPush({
          id: workbench.id,
          message: `Declining Personal Loan`,
          kind: 'loading',
        }),
      );

      dispatch(approvalDecision(workbench.id, apiBody)).then(response => {
        dispatch(hideModal());
        this.setState({ submitError: false });
        dispatch(
          notificationEdit({
            id: workbench.id,
            message: response.error
              ? `Failed to decline Personal Loan`
              : `Personal Loan declined`,
            kind: response.error ? 'error' : 'success',
            dismissAfter: 5000,
          }),
        );
      });
    } else {
      this.setState({ submitError: true });
      return dispatch(
        stopSubmit('recommendationDecline', {
          error: 'You must select at least one decline reason.',
        }),
      );
    }
  };

  render() {
    const fieldProps = { className: 'ProfileForm' };
    const { handleSubmit, submitting, otherCheckbox } = this.props;

    return (
      <form
        className="RecommendationDeclineForm"
        onSubmit={handleSubmit(this.handleDeclineSubmit)}
      >
        <div className="RecommendationDeclineFormCheckboxes">
          <Field
            name="AFFORDABILITY"
            component={Checkbox}
            label="Affordability"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            type="submit"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="MISREPRESENTATION_OF_INCOME"
            component={Checkbox}
            label="Misrepresentation of Income"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="MISREPRESENTATION_OF_HOUSING_COST"
            component={Checkbox}
            label="Misrepresentation of Housing Cost"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="UNABLE_TO_VERIFY_INCOME"
            component={Checkbox}
            label="Unable to Verify Income"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="UNEMPLOYED"
            component={Checkbox}
            label="Unemployed"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="RETIRED"
            component={Checkbox}
            label="Retired"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="NON_PR_OR_CITIZEN"
            component={Checkbox}
            label="Non Permanent Resident or Canadian Citizen"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="NEGATIVE_CREDIT_HISTORY_TRADE_RATINGS"
            component={Checkbox}
            label="Trade Ratings of 7, 8, or 9"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="NEGATIVE_CREDIT_HISTORY_LARGE_NUMBER_NEGATIVE_TRADES"
            component={Checkbox}
            label="Large Number of Negative Trades"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="PAST_BANKRUPTCY"
            component={Checkbox}
            label="Past Bankruptcy"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="PAST_CONSUMER_PROPOSAL"
            component={Checkbox}
            label="Past Consumer Proposal"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="BALANCE_IN_ARREARS_WITH_CRA"
            component={Checkbox}
            label="Balance in Arrears with CRA"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="DISHONEST_OVER_PHONE"
            component={Checkbox}
            label="Dishonest Over the Phone"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="POTENTIAL_FRAUDULENT_TRANSACTION_ID_MANIPULATED"
            component={Checkbox}
            label="ID Manipulated"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="POTENTIAL_FRAUDULENT_TRANSACTION_PAYSTUBS_MANIPULATED"
            component={Checkbox}
            label="Paystubs Manipulated"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="POTENTIAL_FRAUDULENT_TRANSACTION_CHEQUE_MANIPULATED"
            component={Checkbox}
            label="Cheque Manipulated"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="POTENTIAL_FRAUDULENT_TRANSACTION_PHOTO_MANIPULATED"
            component={Checkbox}
            label="Photo Manipulated"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="POTENTIAL_FRAUDULENT_TRANSACTION_APPLIED_WITH_DIFFERENT_NAME"
            component={Checkbox}
            label="Photo Manipulated"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="POTENTIAL_FRAUDULENT_TRANSACTION_DELETED_ACCOUNTS"
            component={Checkbox}
            label="Deleted Accounts"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="SUSPICIOUS_BEHAVIOUR_MULTIPLE_APPLICATIONS_SAME_IP_SESSION"
            component={Checkbox}
            label="Multiple Applications from Same IP or Session"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="NEGATIVE_SPENDING_BEHAVIOUR"
            component={Checkbox}
            label="Negative Spending Behaviour"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="DEROGATORY_INFORMATION_ON_BUREAU"
            component={Checkbox}
            label="Applicant on Blacklist"
            label="Derogatory Information on Bureau"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="FRAUD_WARNING_ON_BUREAU"
            component={Checkbox}
            label="Fraud Warning on Bureau"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="APPLYING_FOR_LOAN_ON_BEHALF_OF_SOMEONE_ELSE"
            component={Checkbox}
            label="Applying for Loan On Behalf of Someone Else"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="MEMBER_DOES_NOT_WANT_TO_PROCEED_WITH_APPLICATION"
            component={Checkbox}
            label="Member does not want to proceed with application"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name="OTHER"
            component={Checkbox}
            label="Other"
            permission="APPROVE_OR_DECLINE_APPLICATION"
            disabled={submitting}
            {...fieldProps}
          />
        </div>
        {otherCheckbox && (
          <FadeIn>
            <Field
              component="textarea"
              autoFocus
              name="declineOtherComment"
              className="RecommendationFormTextarea"
              placeholder="Please provide your decline reason"
            />
          </FadeIn>
        )}
        {this.state.submitError && (
          <p className="LoanBookEditPaymentScheduleForm__error">
            Please provide at least one decline reason
          </p>
        )}
        <Field
          name="submitButton"
          component={FormButton}
          buttonText="Confirm Decline"
          isSubmitting={submitting}
          permission="COS_APPROVE_APPLICATION"
          type="submit"
          disabled={submitting}
          {...fieldProps}
        />
      </form>
    );
  }
}

const selector = formValueSelector('recommendationDecline');

const mapStateToProps = state => ({
  otherCheckbox: selector(state, 'OTHER'),
  workbench: state.workbench,
});

RecommendationDeclineForm = reduxForm({
  form: 'recommendationDecline',
  destroyOnUnmount: false,
  validate,
})(RecommendationDeclineForm);

RecommendationDeclineForm = connect(mapStateToProps)(RecommendationDeclineForm);

export default RecommendationDeclineForm;
