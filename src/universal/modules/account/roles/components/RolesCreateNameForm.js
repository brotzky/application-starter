import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Text } from '../../../forms/fields/';
import { required } from '../../../forms/validation/';
import { capitalizeString } from 'grow-utils/stringFormatting';

let RolesCreateNameForm = () => {
  const fieldProps = { className: 'UsersCreateForm' };
  const isCreateRolePage = window.location.pathname === '/account/roles/create';

  return (
    <form>
      <Field
        name="name"
        component={Text}
        label="Role Name"
        validate={required}
        disabled={!isCreateRolePage}
        format={value => capitalizeString(value, ' ', ' ')}
        {...fieldProps}
      />
      <Field
        name="description"
        label="Role Description"
        component={Text}
        validate={required}
        {...fieldProps}
      />
    </form>
  );
};

RolesCreateNameForm = reduxForm({
  form: 'create-role',
})(RolesCreateNameForm);

RolesCreateNameForm = connect(state => ({
  creatingRole: state.users.creatingRole,
}))(RolesCreateNameForm);

export default RolesCreateNameForm;
