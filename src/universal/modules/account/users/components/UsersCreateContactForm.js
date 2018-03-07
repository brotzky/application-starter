import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Select, Text } from '../../../forms/fields/';

let UsersCreateContactForm = () => {
  const fieldProps = { className: 'UsersCreateForm' };

  return (
    <form>
      <Field name="phone" component={Text} {...fieldProps} />
      <Field name="street" component={Text} {...fieldProps} />
      <Field name="unit" component={Text} {...fieldProps} />
      <div className="UsersCreateFormRow">
        <Field name="city" component={Text} {...fieldProps} />
        <Field name="province" component={Select} {...fieldProps} />
      </div>
      <Field name="postal" component={Text} {...fieldProps} />
    </form>
  );
};

UsersCreateContactForm = reduxForm({
  form: 'create-user',
})(UsersCreateContactForm);

UsersCreateContactForm = connect(state => ({
  creatingUser: state.users.creatingUser,
}))(UsersCreateContactForm);

export default UsersCreateContactForm;
