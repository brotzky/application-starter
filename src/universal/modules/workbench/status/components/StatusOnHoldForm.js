import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector, stopSubmit } from 'redux-form';
import { updateOverrideNote } from 'grow-actions/status/status';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { FormButton, Checkbox } from '../../../forms/fields';
import { FadeIn } from '../../../ui/transitions/';
import validate from '../../../forms/validation/';
import {
  UPDATE_APPLICATION_STATE,
  UPDATE_LAST_ON_HOLD_TRANSITIONS,
} from 'grow-actions/workbench/constants';
import { FRAUD, FSR_AND_FSA, OTHER_ON_HOLD } from '../constants';
import { getPermission } from 'grow-utils/permissionCheck';

const Form = styled.form`
  max-width: 900px;
  max-height: 500px;
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
    width: 250px;
  }
`;
class StatusOnHoldForm extends PureComponent {
  constructor(props) {
    super(props);
    const { workbench, permissions } = this.props;
    const PERM_ENUM = getPermission(workbench.state, 'ON_HOLD', permissions)
      .permission;

    this.state = { submitError: false, PERM_ENUM };
  }

  handleOnHoldSubmit = data => {
    const { dispatch, workbench, note } = this.props;
    const reasons = Object.keys(data).filter(key => data[key] === true);
    const hasOtherReasons = reasons.includes(OTHER_ON_HOLD);

    const apiBody = {
      to: 'ON_HOLD',
      note,
      reasons,
      otherReason: hasOtherReasons ? data.onHoldOtherComment : '',
    };

    if (reasons.length > 0) {
      dispatch(
        notificationPush({
          id: workbench.id,
          message: `On Hold Personal Loan`,
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
              ? `Failed to put Personal Loan on hold`
              : `Personal Loan On Hold`,
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
            type: UPDATE_LAST_ON_HOLD_TRANSITIONS,
            payload: response.payload.data,
          });
        }
      });
    } else {
      this.setState({ submitError: true });
      return dispatch(
        stopSubmit('recommendationOnHold', {
          error: 'Please select at least one on-hold reason',
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
      <Form onSubmit={handleSubmit(this.handleOnHoldSubmit)}>
        <Checkboxes>
          <Field
            name={FSR_AND_FSA}
            component={Checkbox}
            label="FSR & FSA"
            permission={PERM_ENUM}
            defaultChecked={this.verifyCheckedItems(FSR_AND_FSA)}
            type="submit"
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={FRAUD}
            component={Checkbox}
            defaultChecked={this.verifyCheckedItems(FRAUD)}
            label="Fraud"
            permission={PERM_ENUM}
            disabled={submitting}
            {...fieldProps}
          />
          <Field
            name={OTHER_ON_HOLD}
            component={Checkbox}
            defaultChecked={this.verifyCheckedItems(OTHER_ON_HOLD)}
            label="Other"
            permission={PERM_ENUM}
            disabled={submitting}
            {...fieldProps}
          />
        </Checkboxes>
        {otherCheckbox && (
          <FadeIn>
            <Field
              component="textarea"
              autoFocus
              name="onHoldOtherComment"
              className="RecommendationFormTextarea"
              placeholder="Please provide your on hold reason"
            />
          </FadeIn>
        )}
        {this.state.submitError && (
          <p className="LoanBookEditPaymentScheduleForm__error">
            Please provide at least one on hold reason
          </p>
        )}
        <Field
          name="submitButton"
          component={FormButton}
          buttonText="Confirm On Hold"
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

const selector = formValueSelector('statusOnHold');
const overrideFormSelector = formValueSelector('overrideForm');

const mapStateToProps = state => {
  const reasons = state.workbench.transitions.onHold.reasons;
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
    onHoldOtherComment: state.workbench.transitions.onHold.otherReason,
  };

  return {
    otherCheckbox: selector(state, 'OTHER_ON_HOLD'),
    workbench: state.workbench,
    note: overrideFormSelector(state, 'note'),
    checkedItems: state.workbench.transitions.onHold.reasons,
    user: state.user,
    permissions: state.permissions.permissions,
    initialValues,
  };
};

const StatusOnHoldFormWrapper = reduxForm({
  form: 'statusOnHold',
  validate,
})(StatusOnHoldForm);

StatusOnHoldForm.propTypes = {
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

export default connect(mapStateToProps)(StatusOnHoldFormWrapper);
