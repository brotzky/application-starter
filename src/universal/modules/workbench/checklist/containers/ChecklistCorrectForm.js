import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateChecklist } from 'grow-actions/checklist/checklist';
import { getWorkbench } from 'grow-actions/workbench/workbench';
import {
  updateChecklistState,
  HIDE_CHECKLIST_ITEM_DETAILS,
} from '../actions/actions-update-checklist-state';
import { updateQueueState } from '../../../queue/actions/actions-update-queue-state';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { Button } from '../../../ui/components';

const validate = values => {
  const errors = {};

  if (values.overrideComment && values.overrideComment.length < 1) {
    errors.overrideComment = true;
  }

  return errors;
};

class ChecklistCorrectForm extends Component {
  /**
   * Using componentWillUpdate in this case because when the last
   * checklist item is overriden we have to update the product
   * application, by making a getWorkbench async action call. This will
   * get the updated product application with the correct steps
   */
  componentWillUpdate(nextProps) {
    const { dispatch, checklist, params } = nextProps;

    const verified = checklist.checklists.filter(
      check => check.verified === 'VERIFIED',
    );

    if (checklist.checklists.length === verified.length) {
      dispatch(getWorkbench(params.workbenchId));
      dispatch(updateQueueState('QUEUE_IS_STALE'));
    }
  }

  handleSubmit(data) {
    const {
      checklistItemDetails,
      dispatch,
      isVerified,
      handleCloseActionMenu,
      params,
    } = this.props;

    const body = Object.assign({}, data, {
      override: isVerified ? 'MANUAL_OVERRIDE_FAIL' : 'MANUAL_OVERRIDE_PASS',
      verificationChecklistDetailId:
        checklistItemDetails[0].verificationChecklistDetailId,
    });

    return dispatch(
      updateChecklist(
        params.workbenchId,
        checklistItemDetails[0].verificationChecklistDetailId,
        body,
      ),
    ).then(() => {
      handleCloseActionMenu();
    });
  }

  render() {
    const fieldProps = { className: 'ProfileForm' };
    const { handleSubmit, isVerified, submitting, submitFailed } = this.props;

    return (
      <form onSubmit={handleSubmit(data => this.handleSubmit(data))}>
        <Field
          component="textarea"
          name="overrideComment"
          className="ProfileFormTextarea"
          required={true}
          autoFocus
          placeholder="Enter your reason(s) here..."
        />
        {submitFailed && (
          <p className="LoanBookEditPaymentScheduleForm__error">
            Please enter a meaningful message.
          </p>
        )}
        <Field
          name="submitButton"
          type="submit"
          id="solve"
          component={Button}
          text={isVerified ? 'Unresolve' : 'Resolve'}
          isSubmitting={submitting}
          size="large"
          {...fieldProps}
        />
      </form>
    );
  }
}

ChecklistCorrectForm = reduxForm({
  form: 'checklist-correct',
  initialValues: {
    override: '',
    overrideComment: '',
  },
  validate,
})(ChecklistCorrectForm);

const mapStateToProps = state => ({
  checklist: state.checklist,
});

export default connect(mapStateToProps)(ChecklistCorrectForm);
