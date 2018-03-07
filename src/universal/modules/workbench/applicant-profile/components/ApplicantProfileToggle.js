// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, focus, initialize } from 'redux-form';
import ApplicantProfileFile from './ApplicantProfileFile';
import ApplicantProfileText from './ApplicantProfileText';
import ApplicantProfileEdit from './ApplicantProfileEdit';

class ApplicantProfileToggle extends Component {
  state = {
    showEditForm: false,
    formValuesSnapshot: {},
  };

  /**
   * Required to be able to query nested objects. This was introduced
   * to deal with formValues that are deeper than one level. For example,
   * first deposit is:
   *
   * formValues: {
   *   firstDeposit: {
   *     amount: 123
   *     ..
   *   }
   * }
   *
   * @param {string} fieldName
   * @returns {string}
   * @memberof ApplicantProfileToggle
   */
  getFieldValue(fieldName: string): string {
    const query: string[] = fieldName.split('.');
    const hasNoFormValues = !Object.keys(this.props.formValues).length;

    if (hasNoFormValues) return null;

    let fieldValue: {} = this.props.formValues;

    for (let i = 0; i < query.length; i++) {
      if (fieldValue !== undefined) {
        fieldValue = fieldValue[query[i]];
      }
    }
    return fieldValue;
  }

  handleToggleClick = inputName => {
    const { showEditForm, formValuesSnapshot } = this.state;
    const { dispatch, formValues, group } = this.props;
    const isUploadField = group.type === 'upload';

    /**
     * When a user clicks to edit metadata we're storing the current
     * form values in state so if the user clicks "cancel" we can easily
     * reset the form values back to the original ones.
     */
    this.setState({
      showEditForm: !showEditForm,
      formValuesSnapshot: formValues,
    });

    if (typeof inputName === 'string') {
      dispatch(focus('workbench', inputName));
    } else {
      if (!isUploadField) {
        dispatch(initialize('workbench', formValuesSnapshot));
      }
      this.setState({ formValuesSnapshot: {} });
    }
  };

  render() {
    const { group } = this.props;
    return (
      <div>
        {this.state.showEditForm ? (
          <ApplicantProfileEdit
            group={group}
            handleToggleClick={this.handleToggleClick}
          />
        ) : (
          <div>
            {group.fields.map(field => {
              const viewProps = {
                field,
                fieldValue: this.getFieldValue(field.name),
                handleToggleClick: this.handleToggleClick,
              };

              switch (field.type) {
                case 'file':
                  return (
                    <ApplicantProfileFile key={field.name} {...viewProps} />
                  );
                default:
                  return (
                    <ApplicantProfileText key={field.name} {...viewProps} />
                  );
              }
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('workbench')(state),
});

export default connect(mapStateToProps)(ApplicantProfileToggle);
