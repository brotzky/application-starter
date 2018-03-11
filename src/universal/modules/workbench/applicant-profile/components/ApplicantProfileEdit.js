import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fieldBuilder from '../../../forms/utils/fieldBuilder';
import metadataConstructor from '../../../forms/utils/metadataConstructor';
import FormWrapper from '../../../forms/components/FormWrapper';
import { Button } from '../../../ui/components/';
import { updateMemberProductApplicationMetadata } from 'grow-actions/member/member-category-metadata-gac';

const FieldGroupContainer = styled.div`
  padding: 1rem 2.8125rem;
`;

const FieldGroupButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.28571rem 2.8125rem;
  border-bottom: 1px solid #ebeef0;
`;

const FieldGroupButtonWrapper = styled.div`
  padding-left: 2rem;
`;

class ApplicantProfileEdit extends Component {
  handleSubmit = async data => {
    const {
      dispatch,
      handleToggleClick,
      member,
      registeredFields,
      workbench,
      org,
    } = this.props;

    /**
     * We're checking which fields are registered in the form (aka all the fields
     * that the GAC user has clicked "edit" for and only submitting those to backend.
     * This makes it easier to debug instead of sending all the
     * metadata to backend at once.
     *
     * This is turning the registeredFields into a single object
     */
    const activeFields = registeredFields.reduce(
      (obj, field) => ({ ...obj, [field]: data[field] }),
      {},
    );

    const normalizedData = metadataConstructor(
      activeFields,
      workbench.currentStep,
      org,
    );

    const res = await dispatch(
      updateMemberProductApplicationMetadata(
        member.id,
        workbench.id,
        normalizedData,
      ),
    );

    // Passing a string here so it doesnt override
    if (!res.err) handleToggleClick('close');
  };

  checkIfFieldIsLocked = field => {
    const { isLockedForSteps } = field;

    if (!isLockedForSteps) return false;

    return isLockedForSteps.includes(this.props.workbench.currentStep);
  };

  buildFormField = field => {
    const { sameAdmin } = this.props;
    const isLocked = this.checkIfFieldIsLocked(field);
    const disabled = field.disabled || isLocked;
    const formName = 'workbench';

    return (
      <FieldGroupContainer key={field.name}>
        {fieldBuilder({
          ...field,
          disabled,
          formName,
        })}
      </FieldGroupContainer>
    );
  };

  render() {
    const {
      group,
      handleToggleClick,
      workbench,
      files,
      sameAdmin,
    } = this.props;
    return (
      <div>
        <FormWrapper form="workbench" onSubmit={this.handleSubmit}>
          <div>{group.fields.map(this.buildFormField)}</div>
          <FieldGroupButtonContainer>
            <FieldGroupButtonWrapper>
              <Button
                appearance="secondary"
                text="Cancel"
                type="button"
                onClick={handleToggleClick}
                disabled={workbench.isUpdatingMetadata || files.isUploading}
              />
            </FieldGroupButtonWrapper>

            {group.type !== 'upload' && (
              <FieldGroupButtonWrapper>
                <Button
                  type="submit"
                  text="Update"
                  disabled={!sameAdmin}
                  isSubmitting={workbench.isUpdatingMetadata}
                />
              </FieldGroupButtonWrapper>
            )}
          </FieldGroupButtonContainer>
        </FormWrapper>
      </div>
    );
  }
}

/**
 * This will check to see if the registeredField has a count greater than 0,
 * which in redux form language means the form is registered and editable
 * within the UI. We only want to keep fields that are currently being
 * edited.
 *
 * @param {Object} registeredFields
 */
const getActiveFields = registeredFields => {
  if (!registeredFields) return {};

  const activeFields = Object.keys(registeredFields)
    .filter(field => registeredFields[field].count > 0)
    .reduce((obj, field) => ({ ...obj, [field]: registeredFields[field] }), {});

  return Object.keys(activeFields);
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  member: state.member.member,
  org: state.auth.organization,
  sameAdmin: state.workbench.primaryRep.email === state.user.email,
  registeredFields: getActiveFields(state.form.workbench.registeredFields),
  files: state.files,
});

export default connect(mapStateToProps)(ApplicantProfileEdit);
