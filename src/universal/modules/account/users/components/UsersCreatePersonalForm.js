import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { rolesPropType, isCreateUserFormPropType } from 'gac-utils/proptypes';
import { Text, Select } from '../../../forms/fields/';
import { required } from '../../../forms/validation/';
import { capitalizeString } from 'grow-utils/stringFormatting';

let UsersCreatePersonalForm = props => {
  const { roles, isCreateUserForm } = props;
  const fieldProps = { className: 'UsersCreateForm' };

  const roleOptions = roles.map(role => ({
    name: capitalizeString(role.name, ' ', ' '),
    value: role.name,
  }));

  roleOptions.sort((a, b) => (a.value > b.value ? 1 : -1));

  return (
    <form>
      <div className="UsersCreateFormRow">
        <Field
          name="firstName"
          component={Text}
          label="First name"
          validate={required}
          {...fieldProps}
        />
        <Field
          name="lastName"
          component={Text}
          label="Last name"
          validate={required}
          {...fieldProps}
        />
      </div>
      <Field
        name="email"
        type="email"
        component={Text}
        label="Email address"
        validate={required}
        disabled={!isCreateUserForm}
        {...fieldProps}
      />
      <Field
        name="role"
        component={Select}
        selectText="Select role"
        label="Role"
        options={roleOptions}
        validate={required}
        {...fieldProps}
      />
    </form>
  );
};

UsersCreatePersonalForm.defaultProps = {
  isCreateUserForm: false,
};

UsersCreatePersonalForm.propTypes = {
  roles: rolesPropType.isRequired,
  isCreateUserForm: isCreateUserFormPropType,
};

UsersCreatePersonalForm = reduxForm({
  form: 'create-user',
})(UsersCreatePersonalForm);

const UsersCreatePersonalFormWrapper = connect(state => ({
  creatingUser: state.users.creatingUser,
  roles: state.users.roles,
}))(UsersCreatePersonalForm);

export default UsersCreatePersonalFormWrapper;
