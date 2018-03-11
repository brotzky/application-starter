import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { rolesPropType, isCreateUserFormPropType } from 'gac-utils/proptypes';
import { Text, Select } from '../../../forms/fields/';
import { required } from '../../../forms/validation/';
import { capitalizeString } from 'grow-utils/stringFormatting';

const UsersCreateFormRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  div {
    width: 50%;
    margin-right: 4%;

    &:last-child {
      margin-right: 0;
    }
  }
`;

let UsersCreatePersonalForm = props => {
  const { roles, isCreateUserForm, users } = props;

  const roleOptions = roles.map(role => ({
    name: capitalizeString(role.name, ' ', ' '),
    value: role.name,
  }));

  roleOptions.sort((a, b) => (a.value > b.value ? 1 : -1));

  // Check existing users list. Does not allow creating account with same email address
  const userEmailExist = email => {
    if (!email || !isCreateUserForm) {
      return undefined;
    }
    return users.find(user => user.email === email)
      ? {
          defaultMessage: ' is already in use. Choose another email address',
          id: 'form.errors.isRequired',
          values: {},
        }
      : undefined;
  };

  return (
    <form>
      <UsersCreateFormRow>
        <Field
          name="firstName"
          component={Text}
          label="First name"
          validate={required}
        />
        <Field
          name="lastName"
          component={Text}
          label="Last name"
          validate={required}
        />
      </UsersCreateFormRow>
      <Field
        name="email"
        type="email"
        component={Text}
        label="Email address"
        validate={(required, userEmailExist)}
        disabled={!isCreateUserForm}
      />
      <Field
        name="role"
        component={Select}
        selectText="Select role"
        label="Role"
        options={roleOptions}
        validate={required}
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
  users: state.users.users,
}))(UsersCreatePersonalForm);

export default UsersCreatePersonalFormWrapper;
