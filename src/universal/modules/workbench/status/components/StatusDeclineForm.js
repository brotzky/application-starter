import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector, stopSubmit } from 'redux-form';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { Checkbox, FormButton } from '../../../forms/fields/';
import { FadeIn } from '../../../ui/transitions/';
import validate from '../../../forms/validation/';
import { updateOverrideNote } from 'grow-actions/status/status';
import {
  UPDATE_APPLICATION_STATE,
  UPDATE_LAST_DECLINED_TRANSITIONS,
} from 'grow-actions/workbench/constants';
import {
  AFFORDABILITY,
  MISREPRESENTATION_OF_INCOME,
  MISREPRESENTATION_OF_HOUSING_COST,
  UNABLE_TO_VERIFY_INCOME,
  UNEMPLOYED,
  RETIRED,
  NON_PR_OR_CITIZEN,
  NEGATIVE_CREDIT_HISTORY_TRADE_RATINGS,
  NEGATIVE_CREDIT_HISTORY_LARGE_NUMBER_NEGATIVE_TRADES,
  PAST_BANKRUPTCY,
  PAST_CONSUMER_PROPOSAL,
  BALANCE_IN_ARREARS_WITH_CRA,
  DISHONEST_OVER_PHONE,
  POTENTIAL_FRAUDULENT_TRANSACTION_ID_MANIPULATED,
  POTENTIAL_FRAUDULENT_TRANSACTION_PAYSTUBS_MANIPULATED,
  POTENTIAL_FRAUDULENT_TRANSACTION_CHEQUE_MANIPULATED,
  POTENTIAL_FRAUDULENT_TRANSACTION_PHOTO_MANIPULATED,
  POTENTIAL_FRAUDULENT_TRANSACTION_APPLIED_WITH_DIFFERENT_NAME,
  POTENTIAL_FRAUDULENT_TRANSACTION_DELETED_ACCOUNTS,
  SUSPICIOUS_BEHAVIOUR_MULTIPLE_APPLICATIONS_SAME_IP_SESSION,
  NEGATIVE_SPENDING_BEHAVIOUR,
  APPLICANT_ON_BLACKLIST,
  DEROGATORY_INFORMATION_ON_BUREAU,
  FRAUD_WARNING_ON_BUREAU,
  APPLYING_FOR_LOAN_ON_BEHALF_OF_SOMEONE_ELSE,
  MEMBER_DOES_NOT_WANT_TO_PROCEED_WITH_APPLICATION,
  OTHER_DECLINED,
} from '../constants';
import { getPermission } from 'grow-utils/permissionCheck';

const Form = styled.form`
  max-width: 1350px;
  max-height: 600px;
  overflow: scroll;
  margin: 0 auto;
  padding: 2rem;

  p {
    text-align: center;
  }
`;

const Checkboxes = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
  cursor: pointer;
  > div {
    width: 400px;
  }
`;
class StatusDeclineForm extends PureComponent {
  constructor(props) {
    super(props);
    const { workbench, permissions } = this.props;
    const PERM_ENUM = getPermission(workbench.state, 'DECLINED', permissions)
      .permission;

    this.state = { submitError: false, PERM_ENUM };
  }

  handleDeclineSubmit = data => {
    const { dispatch, workbench, note } = this.props;
    const reasons = Object.keys(data).filter(key => data[key] === true);
    const hasOtherReasons = reasons.includes(OTHER_DECLINED);

    const apiBody = {
      to: 'DECLINED',
      note,
      reasons,
      otherReason: hasOtherReasons ? data.declinedOtherComment : '',
    };

    if (reasons.length > 0) {
      dispatch(
        notificationPush({
          id: workbench.id,
          message: `Declining Personal Loan`,
          kind: 'loading',
        }),
      );

      dispatch(
        updateOverrideNote(workbench.creator.id, workbench.id, apiBody),
      ).then(response => {
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

        if (!response.error) {
          dispatch({
            type: UPDATE_APPLICATION_STATE,
            payload: { state: response.payload.data.to.toLowerCase() },
          });
          dispatch({
            type: UPDATE_LAST_DECLINED_TRANSITIONS,
            payload: response.payload.data,
          });
        }
      });
    } else {
      this.setState({ submitError: true });
      return dispatch(
        stopSubmit('statusDecline', {
          error: 'Please select at least one decline reason.',
        }),
      );
    }
  };

  // to pre-check checkboxes based on the last record
  verifyCheckedItems = item => this.props.checkedItems.includes(item);

  render() {
    const fieldProps = { className: 'ProfileForm' };
    const { handleSubmit, submitting, otherCheckbox } = this.props;
    const { PERM_ENUM } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.handleDeclineSubmit)}>
        <Checkboxes>
          <Field
            name={AFFORDABILITY}
            component={Checkbox}
            label="Affordability"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(AFFORDABILITY)}
            type="submit"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={MISREPRESENTATION_OF_INCOME}
            component={Checkbox}
            label="Misrepresentation of Income"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              MISREPRESENTATION_OF_INCOME,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={MISREPRESENTATION_OF_HOUSING_COST}
            component={Checkbox}
            label="Misrepresentation of Housing Cost"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              MISREPRESENTATION_OF_HOUSING_COST,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={UNABLE_TO_VERIFY_INCOME}
            component={Checkbox}
            label="Unable to Verify Income"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(UNABLE_TO_VERIFY_INCOME)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={UNEMPLOYED}
            component={Checkbox}
            label="Unemployed"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(UNEMPLOYED)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={RETIRED}
            component={Checkbox}
            label="Retired"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(RETIRED)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={NON_PR_OR_CITIZEN}
            component={Checkbox}
            label="Non Permanent Resident or Canadian Citizen"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(NON_PR_OR_CITIZEN)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={NEGATIVE_CREDIT_HISTORY_TRADE_RATINGS}
            component={Checkbox}
            label="Trade Ratings of 7, 8, or 9"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              NEGATIVE_CREDIT_HISTORY_TRADE_RATINGS,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={NEGATIVE_CREDIT_HISTORY_LARGE_NUMBER_NEGATIVE_TRADES}
            component={Checkbox}
            label="Large Number of Negative Trades"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              NEGATIVE_CREDIT_HISTORY_LARGE_NUMBER_NEGATIVE_TRADES,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={PAST_BANKRUPTCY}
            component={Checkbox}
            label="Past Bankruptcy"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(PAST_BANKRUPTCY)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={PAST_CONSUMER_PROPOSAL}
            component={Checkbox}
            label="Past Consumer Proposal"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(PAST_CONSUMER_PROPOSAL)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={BALANCE_IN_ARREARS_WITH_CRA}
            component={Checkbox}
            label="Balance in Arrears with CRA"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              BALANCE_IN_ARREARS_WITH_CRA,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={DISHONEST_OVER_PHONE}
            component={Checkbox}
            label="Dishonest Over the Phone"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(DISHONEST_OVER_PHONE)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={POTENTIAL_FRAUDULENT_TRANSACTION_ID_MANIPULATED}
            component={Checkbox}
            label="ID Manipulated"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              POTENTIAL_FRAUDULENT_TRANSACTION_ID_MANIPULATED,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={POTENTIAL_FRAUDULENT_TRANSACTION_PAYSTUBS_MANIPULATED}
            component={Checkbox}
            label="Paystubs Manipulated"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              POTENTIAL_FRAUDULENT_TRANSACTION_PAYSTUBS_MANIPULATED,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={POTENTIAL_FRAUDULENT_TRANSACTION_CHEQUE_MANIPULATED}
            component={Checkbox}
            label="Cheque Manipulated"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              POTENTIAL_FRAUDULENT_TRANSACTION_CHEQUE_MANIPULATED,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={POTENTIAL_FRAUDULENT_TRANSACTION_PHOTO_MANIPULATED}
            component={Checkbox}
            label="Photo Manipulated"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              POTENTIAL_FRAUDULENT_TRANSACTION_PHOTO_MANIPULATED,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={POTENTIAL_FRAUDULENT_TRANSACTION_APPLIED_WITH_DIFFERENT_NAME}
            component={Checkbox}
            label="Photo Manipulated"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              POTENTIAL_FRAUDULENT_TRANSACTION_APPLIED_WITH_DIFFERENT_NAME,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={POTENTIAL_FRAUDULENT_TRANSACTION_DELETED_ACCOUNTS}
            component={Checkbox}
            label="Deleted Accounts"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              POTENTIAL_FRAUDULENT_TRANSACTION_DELETED_ACCOUNTS,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={NEGATIVE_SPENDING_BEHAVIOUR}
            component={Checkbox}
            label="Negative Spending Behaviour"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              NEGATIVE_SPENDING_BEHAVIOUR,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={APPLICANT_ON_BLACKLIST}
            component={Checkbox}
            label="Applicant on blacklist"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(APPLICANT_ON_BLACKLIST)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={DEROGATORY_INFORMATION_ON_BUREAU}
            component={Checkbox}
            label="Derogatory Information on Bureau"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              DEROGATORY_INFORMATION_ON_BUREAU,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={FRAUD_WARNING_ON_BUREAU}
            component={Checkbox}
            label="Fraud Warning on Bureau"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(FRAUD_WARNING_ON_BUREAU)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={APPLYING_FOR_LOAN_ON_BEHALF_OF_SOMEONE_ELSE}
            component={Checkbox}
            label="Applying for Loan On Behalf of Someone Else"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              APPLYING_FOR_LOAN_ON_BEHALF_OF_SOMEONE_ELSE,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={SUSPICIOUS_BEHAVIOUR_MULTIPLE_APPLICATIONS_SAME_IP_SESSION}
            component={Checkbox}
            label="Multiple Applications from Same IP or Session"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              SUSPICIOUS_BEHAVIOUR_MULTIPLE_APPLICATIONS_SAME_IP_SESSION,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={MEMBER_DOES_NOT_WANT_TO_PROCEED_WITH_APPLICATION}
            component={Checkbox}
            label="Member does not want to proceed with application"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              MEMBER_DOES_NOT_WANT_TO_PROCEED_WITH_APPLICATION,
            )}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={OTHER_DECLINED}
            component={Checkbox}
            label="Other"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(OTHER_DECLINED)}
            disabled={submitting}
            {...fieldProps}
          />
        </Checkboxes>
        {otherCheckbox && (
          <FadeIn>
            <Field
              component="textarea"
              autoFocus
              name="declinedOtherComment"
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
          permission={PERM_ENUM}
          type="submit"
          disabled={submitting}
          {...fieldProps}
        />
      </Form>
    );
  }
}

const selector = formValueSelector('statusDecline');
const overrideFormSelector = formValueSelector('overrideForm');

const mapStateToProps = state => {
  const reasons = state.workbench.transitions.declined.reasons;
  let initialValues = {};
  // transform reasons array into object and set values to true
  reasons.forEach(elem => {
    initialValues = {
      ...initialValues,
      [elem]: true,
    };
  });
  // lastly add the "Other" comments
  initialValues = {
    ...initialValues,
    declinedOtherComment: state.workbench.transitions.declined.otherReason,
  };

  return {
    otherCheckbox: selector(state, 'OTHER_DECLINED'),
    workbench: state.workbench,
    note: overrideFormSelector(state, 'note'),
    checkedItems: state.workbench.transitions.declined.reasons,
    user: state.user,
    permissions: state.permissions.permissions,
    initialValues,
  };
};

const StatusDeclineFormWrapper = reduxForm({
  form: 'statusDecline',
  validate,
})(StatusDeclineForm);

StatusDeclineForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  workbench: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  note: PropTypes.string.isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default connect(mapStateToProps)(StatusDeclineFormWrapper);
