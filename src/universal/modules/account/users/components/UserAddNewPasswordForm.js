import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Text } from '../../../forms/fields/';
import { Button } from '../../../ui/components';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: inline-block;
  margin: 1rem 2rem 0 0;
`;

let UserAddNewPasswordForm = ({
  toggleNewPasswordFormVisibility,
  addPassword,
  passwordValidationMessage,
  handleSubmit,
  auth0InviteStatus,
  updatePasswordHandler,
  isUpdatingPassword,
}) => {
  const fieldProps = { className: 'UsersCreateForm' };
  const required = value =>
    value
      ? undefined
      : {
          defaultMessage: 'is required',
        };

  return (
    <form
      onSubmit={handleSubmit(
        auth0InviteStatus === 'NONE' ? addPassword : updatePasswordHandler,
      )}
    >
      {auth0InviteStatus !== 'NONE' ? (
        <Field
          name="oldPassword"
          component={Text}
          label="Old Password"
          validate={required}
          type="password"
          {...fieldProps}
        />
      ) : null}
      <Field
        name="newPassword"
        component={Text}
        label="New Password"
        validate={required}
        type="password"
        {...fieldProps}
      />
      <Field
        name="confirmPassword"
        component={Text}
        label="Confirm Password"
        validate={required}
        type="password"
        {...fieldProps}
      />
      {passwordValidationMessage}
      <ButtonWrapper>
        <Button text="Save" size="large" isSubmitting={isUpdatingPassword} />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          text="Cancel"
          appearance="secondary"
          type="button"
          size="large"
          isDisabled={isUpdatingPassword}
          onClick={toggleNewPasswordFormVisibility}
        />
      </ButtonWrapper>
    </form>
  );
};

UserAddNewPasswordForm = reduxForm({
  form: 'new-password',
})(UserAddNewPasswordForm);

UserAddNewPasswordForm = connect(state => ({
  isUpdatingPassword: state.user.isUpdatingPassword,
}))(UserAddNewPasswordForm);

export default UserAddNewPasswordForm;
