import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { updateChecklist } from 'grow-actions/checklist/checklist';
import { getWorkbench } from 'grow-actions/workbench/workbench';
import {
  updateChecklistState,
  HIDE_CHECKLIST_ITEM_DETAILS,
} from '../actions/actions-update-checklist-state';
import { updateQueueState } from '../../../queue/actions/actions-update-queue-state';
import { Button, ProfilePicture } from '../../../ui/components';

const validate = values => {
  const errors = {};
  if (values.overrideComment && !values.overrideComment.trim().length) {
    errors.overrideComment = true;
  }

  return errors;
};

class ChecklistCorrectForm extends Component {
  state = {
    collapse: true,
  };

  /**
   * Using componentWillUpdate in this case because when the last
   * checklist item is overriden we have to update the product
   * application, by making a getWorkbench async action call. This will
   * get the updated product application with the correct steps
   */
  componentWillUpdate(nextProps) {
    const { dispatch, checklist, params } = nextProps;

    const verified = checklist.checklists.filter(
      check =>
        check.verificationResult === 'PASS' ||
        check.verificationResult === 'OVERRIDE_PASS',
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

  /**
   *  Compose the overrideComment component for redux-form.
   */
  renderTextArea = ({ input: { value, onChange }, collapse }) => (
    <TextArea
      value={value}
      onChange={onChange}
      onBlur={onChange}
      innerRef={node => (this.inputNode = node)}
      placeholder={`Add a ${
        this.props.isVerified ? 'review' : 'resolution'
      } comment...`}
      required={true}
      collapse={collapse}
      onFocus={e => {
        this.inputNode.focus();
        this.setState({ collapse: !collapse });
      }}
    />
  );

  render() {
    const {
      handleSubmit,
      hasPermission,
      submitting,
      submitFailed,
      user,
      dispatch,
      checklistItem,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(data => this.handleSubmit(data))}>
        <FormRow>
          <ProfilePictureWrapper>
            <ProfilePicture size={38} user={user} />
          </ProfilePictureWrapper>
          {hasPermission ? (
            <div style={{ padding: '0 1.75rem', flex: '8' }}>
              <Field
                name="overrideComment"
                component={this.renderTextArea}
                collapse={this.state.collapse}
              />
              {!this.state.collapse && (
                <div ref={node => (this.node = node)}>
                  <SubmitButton
                    type="submit"
                    id="solve"
                    text="Save"
                    disabled={submitting}
                    isSubmitting={submitting}
                    size="small"
                  />
                  <Button
                    type="button"
                    appearance="transparent"
                    text="Cancel"
                    onClick={() => {
                      this.setState({ collapse: true });
                    }}
                    disabled={submitting}
                    size="small"
                  />
                </div>
              )}
            </div>
          ) : (
            <p>
              You do not have permission to resolve the{' '}
              <strong>{checklistItem.prettyName}</strong> checklist item. Please
              ask an adminstrator to update your permissions to proceed.
            </p>
          )}

          {submitFailed && (
            <ErrorMessage>Please enter a meaningful message.</ErrorMessage>
          )}
        </FormRow>
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
  user: state.user,
});

export default connect(mapStateToProps)(ChecklistCorrectForm);

const SubmitButton = styled(Button)`
  > button {
    min-width: 5rem;
    padding: 6px 13px;
  }
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.2rem;
  color: ${props => props.theme.colors.red};
  font-weight: 600;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
`;

const ProfilePictureWrapper = styled.div`
  padding-top: 5px;
  width: 68px;
  min-width: 68px;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${props => (props.collapse ? '45' : '155')}px;
  border-radius: 3px;
  padding: ${props => Number(props.theme.space) / 2}rem 1.75rem;
  border: 1px solid #dee4e7;
  margin-bottom: 1.6rem;
  color: ${props => props.theme.colors.black};
  line-height: 1.5;
  outline: none;
  resize: none;
`;
