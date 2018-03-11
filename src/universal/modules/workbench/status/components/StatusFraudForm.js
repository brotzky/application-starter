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
import { FormButton, Checkbox } from '../../../forms/fields/';
import { FadeIn } from '../../../ui/transitions/';
import validate from '../../../forms/validation/';
import { updateOverrideNote } from 'grow-actions/status/status';
import {
  UPDATE_APPLICATION_STATE,
  UPDATE_LAST_FRAUD_TRANSITIONS,
} from 'grow-actions/workbench/constants';
import { QUEUE_IS_STALE } from '../../shell/actions/actions-update-queue-state';
import {
  FRAUD_WARNING_ON_CREDIT_BUREAU,
  EMAILAGE_EMAIL_CHECK,
  EMAILAGE_IP_CHECK,
  NAME_NOT_MATCH_BANK_ACCT,
  ADDRESS_NOT_MATCH_BUREAU,
  LARGE_CASH_TRANSACTION,
  TOO_MANY_INQUIRIES,
  NEW_MEMBER_VERIFICATION,
  PEP_SELECTED,
  THIRD_PARTY_SELECTED,
  ID_UPLOADED,
  OTHER_FRAUD,
} from '../constants';
import { getPermission } from 'grow-utils/permissionCheck';

const Form = styled.form`
  max-width: 1280px;
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
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
  cursor: pointer;
  > div {
    width: 365px;
  }
`;

const StatusTextarea = styled.textarea`
  overflow: auto;
  outline: none;
  width: 100%;
  min-height: 145px;
  padding: 1.5rem;
  border: 1px solid #dee4e7;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  resize: none;
  line-height: 1.5;
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
`;

class StatusFraudForm extends PureComponent {
  constructor(props) {
    super(props);
    const { workbench, permissions } = this.props;
    const PERM_ENUM = getPermission(workbench.state, 'FRAUD', permissions)
      .permission;
    this.state = { submitError: false, PERM_ENUM };
  }

  handleFraudSubmit = data => {
    const { dispatch, workbench, note } = this.props;
    const reasons = Object.keys(data).filter(key => data[key] === true);
    const hasOtherReasons = reasons.includes(OTHER_FRAUD);

    const apiBody = {
      to: 'FRAUD',
      note,
      reasons,
      otherReason: hasOtherReasons ? data.fraudOtherComment : '',
    };

    if (reasons.length > 0) {
      dispatch(
        notificationPush({
          id: workbench.id,
          message: `Fraud - Personal Loan`,
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
              ? `Failed to mark Personal Loan as Fraud`
              : `Personal Loan - Fraud`,
            kind: response.error ? 'error' : 'success',
            dismissAfter: 5000,
          }),
        );

        if (!response.error) {
          dispatch({
            type: UPDATE_APPLICATION_STATE,
            payload: {
              state: response.payload.data.to
                .toLowerCase()
                .split('_')
                .join('-'),
            },
          });
          dispatch({
            type: UPDATE_LAST_FRAUD_TRANSITIONS,
            payload: response.payload.data,
          });
          dispatch({
            type: QUEUE_IS_STALE,
          });
        }
      });
    } else {
      this.setState({ submitError: true });
      return dispatch(
        stopSubmit('recommendationFraud', {
          error: 'Please select at least one fraud reason',
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
      <Form onSubmit={handleSubmit(this.handleFraudSubmit)}>
        <Checkboxes>
          <Field
            name={FRAUD_WARNING_ON_CREDIT_BUREAU}
            component={Checkbox}
            label="Fraud warning on credit bureau"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(
              FRAUD_WARNING_ON_CREDIT_BUREAU,
            )}
            type="submit"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={EMAILAGE_EMAIL_CHECK}
            component={Checkbox}
            label="Emailage email check"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(EMAILAGE_EMAIL_CHECK)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={EMAILAGE_IP_CHECK}
            component={Checkbox}
            label="Emailage IP check"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(EMAILAGE_IP_CHECK)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={NAME_NOT_MATCH_BANK_ACCT}
            component={Checkbox}
            label="Name does not match verified bank account"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(NAME_NOT_MATCH_BANK_ACCT)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={ADDRESS_NOT_MATCH_BUREAU}
            component={Checkbox}
            label="Address did not match on credit bureau"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(ADDRESS_NOT_MATCH_BUREAU)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={LARGE_CASH_TRANSACTION}
            component={Checkbox}
            label="Large cash transactions in cash flow"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(LARGE_CASH_TRANSACTION)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={NEW_MEMBER_VERIFICATION}
            component={Checkbox}
            label="New Member Verification"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(NEW_MEMBER_VERIFICATION)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={PEP_SELECTED}
            component={Checkbox}
            label="PEP Selected"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(PEP_SELECTED)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={THIRD_PARTY_SELECTED}
            component={Checkbox}
            label="Third Party Selected"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(THIRD_PARTY_SELECTED)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={TOO_MANY_INQUIRIES}
            component={Checkbox}
            label="More than two inquiries on bureau in last 30 days"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(TOO_MANY_INQUIRIES)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={ID_UPLOADED}
            component={Checkbox}
            label="An ID was uploaded (Manual Review)"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(ID_UPLOADED)}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={OTHER_FRAUD}
            component={Checkbox}
            label="Other"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(OTHER_FRAUD)}
            disabled={submitting}
            {...fieldProps}
          />
        </Checkboxes>
        {otherCheckbox && (
          <FadeIn>
            <Field
              component="textarea"
              autoFocus
              name="fraudOtherComment"
              className={StatusTextarea}
              placeholder="Please provide your fraud reason"
            />
          </FadeIn>
        )}
        {this.state.submitError && (
          <p className="LoanBookEditPaymentScheduleForm__error">
            Please provide at least one fraud reason
          </p>
        )}
        <Field
          name="submitButton"
          component={FormButton}
          buttonText="Confirm Fraud"
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

const selector = formValueSelector('statusFraud');
const overrideFormSelector = formValueSelector('overrideForm');

const mapStateToProps = state => {
  const reasons = state.workbench.transitions.fraud.reasons;
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
    fraudOtherComment: state.workbench.transitions.fraud.otherReason,
  };

  return {
    otherCheckbox: selector(state, 'OTHER_FRAUD'),
    workbench: state.workbench,
    note: overrideFormSelector(state, 'note'),
    checkedItems: state.workbench.transitions.fraud.reasons,
    user: state.user,
    permissions: state.permissions.permissions,
    initialValues,
  };
};

const StatusFraudFormWrapper = reduxForm({
  form: 'statusFraud',
  validate,
})(StatusFraudForm);

StatusFraudForm.propTypes = {
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

export default connect(mapStateToProps)(StatusFraudFormWrapper);
