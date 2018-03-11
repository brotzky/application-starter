import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { Select, Text } from '../../../forms/fields/';

const UsersCreateFormRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
// Form for User Creation
let UsersCreateCttForm = () => (
  <form>
    <Field name="phone" component={Text} />
    <Field name="street" component={Text} />
    <Field name="unit" component={Text} />
    <UsersCreateFormRow>
      <Field name="city" component={Text} />
      <Field name="province" component={Select} />
    </UsersCreateFormRow>
    <Field name="postal" component={Text} />
  </form>
);

UsersCreateCttForm = reduxForm({
  form: 'create-user',
})(UsersCreateCttForm);

const UsersCreateContactForm = connect(state => ({
  creatingUser: state.users.creatingUser,
}))(UsersCreateCttForm);

export default UsersCreateContactForm;
