import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { Text } from '../../../forms/fields/';
import { Button } from '../../../ui/components';

const ButtonWrapper = styled.div`
  display: inline-block;
  margin: 1rem 2rem 0 0;
`;

const MarginBottom = styled.div`
  margin-bottom: 2rem;
  overflow: auto;
  border-bottom: 1px dashed #e2dddd;
  padding-bottom: 1.4rem;
`;

let UserAddNewPwdForm = ({
  toggleNewPasswordFormVisibility,
  addPassword,
  passwordValidationMessage,
  handleSubmit,
  auth0InviteStatus,
  updatePasswordHandler,
  isUpdatingPassword,
}) => {
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
        <MarginBottom>
          <Field
            name="oldPassword"
            component={Text}
            label="Old Password"
            validate={required}
            type="password"
          />
        </MarginBottom>
      ) : null}
      <Field
        name="newPassword"
        component={Text}
        label="New Password"
        validate={required}
        type="password"
      />
      <Field
        name="confirmPassword"
        component={Text}
        label="Confirm Password"
        validate={required}
        type="password"
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

UserAddNewPwdForm = reduxForm({
  form: 'new-password',
})(UserAddNewPwdForm);

const UserAddNewPasswordForm = connect(state => ({
  isUpdatingPassword: state.user.isUpdatingPassword,
}))(UserAddNewPwdForm);

export default UserAddNewPasswordForm;
