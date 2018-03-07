import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { FormButton, Select } from '../../forms/fields';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../themes';

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
  const {
    handleSubmit,
    productApplications,
    submitting,
    category,
    permissions,
  } = props;
  const fieldProps = {
    className: 'NoteForm',
  };
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
      <form onSubmit={handleSubmit} className={fieldProps.className}>
        <div style={{ padding: '0.5rem 2.25rem' }}>
          <Field
            name="category"
            component={Select}
            options={categoryOptions}
            label="Category"
            {...fieldProps}
          />
        </div>
        <div className={`${fieldProps.className}Content`}>
          <Field
            {...fieldProps}
            name="content"
            component="textarea"
            placeholder="Write your note..."
            autoFocus
            className={`${fieldProps.className}Textarea`}
          />
        </div>
        <div className={`${fieldProps.className}ButtonWrapper`} id="addNoteSubmit">
          <Field
            name="submitButton"
            component={FormButton}
            buttonText="Add note"
            isSubmitting={submitting}
            type="submit"
            disabled={submitting}
            permission={mapCategoryPermissions()}
            {...fieldProps}
          />
        </div>
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
