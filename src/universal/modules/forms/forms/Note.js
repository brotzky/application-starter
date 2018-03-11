import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { FormButton, Select } from '../../forms/fields';
import { theme } from '../../../themes';

const NoteFormContent = styled.div`
  margin-bottom: 1.6rem;

  > textarea {
    min-height: 226px;
  }
`;

const NoteFormButtonWrapper = styled.div`
  padding: 0 2.4rem 1.6rem;
`;

const TextArea = styled.textarea`
  border-top: 1px solid #efefef;
  border-left: none;
  border-right: none;
  border-bottom: none;
  width: 100%;
  height: 100%;
  resize: none;
  line-height: inherit;
  padding: 1rem 2rem;

  &:focus,
  &:active {
    outline: none;
    background: ${props => props.theme.colors.greyLight};
  }
`;

export const notesTheme = {
  ...theme,
  select: {
    background: '#fff',
    border: {
      width: '0px',
      style: 'transparent',
    },
    width: '100%',
    svg: {
      height: '1.2rem',
      top: '1.4rem',
    },
  },
  labels: {
    color: '#585858',
    fontSize: '1.4rem',
    width: '70px',
    textTransform: 'initial',
  },
};

let NoteForm = props => {
  const { handleSubmit, productApplications, submitting, category } = props;

  const productApplicationsOptions = productApplications
    .filter(application => application.currentStep !== 'serving')
    .map(application => ({
      name: `Application - ${capitalizeString(
        application.productName,
        '-',
        ' ',
      )}`,
      value: `underwriting%${application.id}`,
    }));
  const fraudOptions = productApplications
    .filter(application => application.currentStep !== 'serving')
    .map(application => ({
      name: `Fraud - ${capitalizeString(application.productName, '-', ' ')}`,
      value: `fraud%${application.id}`,
    }));
  const productServingOptions = productApplications
    .filter(application => application.currentStep === 'serving')
    .map(application => ({
      name: `Product - ${capitalizeString(application.productName, '-', ' ')}`,
      value: `product%${application.id}`,
    }));
  const categoryOptions = [
    { name: 'General', value: 'member%' },
    ...productApplicationsOptions,
    ...productServingOptions,
    ...fraudOptions,
  ];

  const mapCategoryPermissions = () => {
    switch (category) {
      case 'underwriting':
        return 'EDIT_UNDERWRITING_NOTE';
      case 'member':
        return 'EDIT_MEMBER_NOTE';
      case 'product':
        return 'EDIT_PRODUCT_NOTE';
      default:
        return 'EDIT_UNDERWRITING_NOTE';
    }
  };

  return (
    <ThemeProvider theme={notesTheme}>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '0.5rem 2.25rem' }}>
          <Field
            name="category"
            component={Select}
            options={categoryOptions}
            label="Category"
          />
        </div>
        <NoteFormContent>
          <Field
            name="content"
            component={TextArea}
            placeholder="Write your note..."
            autoFocus
          />
        </NoteFormContent>
        <NoteFormButtonWrapper id="addNoteSubmit">
          <Field
            name="submitButton"
            component={FormButton}
            buttonText="Add note"
            isSubmitting={submitting}
            type="submit"
            disabled={submitting}
            permission={mapCategoryPermissions()}
          />
        </NoteFormButtonWrapper>
      </form>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  category: state.notes.queryParams.category || 'underwriting',
  permissions: state.permissions.permissions,
});

NoteForm = reduxForm({
  form: 'note',
})(NoteForm);

export default connect(mapStateToProps)(NoteForm);
