import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import styled from 'styled-components';

import { Button } from '../../../ui/components';
import {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
} from 'grow-actions/roles/roles';

import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';
import { AUTH_UPDATE_PERMISSION } from 'grow-actions/auth/constants';

const FormButton = styled.form`
  display: flex;
  justify-content: flex-end;
  margin: 4rem
    ${props => (props.buttonText === 'Delete Role' ? '3.375rem' : '0')} 0 0;
`;

class RolesCreateFormSubmit extends Component {
  handleCreateRole = values => {
    const { dispatch, buttonText, roleId, user } = this.props;
    const { name, description } = values;
    const permissions = Object.keys(values.permissions).filter(
      key => values.permissions[key],
    );

    // create the permission object to update the permission role when the user update their own permissions
    let permissionObj = {};
    permissions.forEach(permission => {
      permissionObj = { ...permissionObj, [permission]: true };
    });

    const roleObject = {
      name,
      description,
      permissions,
    };

    if (buttonText === 'Update Role') {
      dispatch(
        notificationPush({
          id: name,
          message: `Updating ${name} role`,
          kind: 'loading',
        }),
      );

      dispatch(updateRole(roleObject)).then(response => {
        if (!response.error) {
          dispatch(
            notificationEdit({
              id: name,
              message: `Updated ${name} role`,
              kind: 'success',
              dismissAfter: 3000,
            }),
          );
        }

        // if user is updating their own permission
        if (name === user.role[0]) {
          dispatch({
            type: AUTH_UPDATE_PERMISSION,
            payload: permissionObj,
          });
        }
      });
    } else if (buttonText === 'Delete Role') {
      dispatch(
        notificationPush({
          id: name,
          message: `Deleting ${name} role`,
          kind: 'loading',
        }),
      );
      dispatch(deleteRole(roleId)).then(response => {
        if (!response.error) {
          dispatch(getRoles());
          dispatch(
            notificationEdit({
              id: name,
              message: `Deleted ${name} role`,
              kind: 'success',
              dismissAfter: 3000,
            }),
          );
          dispatch(reset('create-role'));
        }
      });
    } else {
      dispatch(
        notificationPush({
          id: name,
          message: `Creating ${name} role`,
          kind: 'loading',
        }),
      );
      dispatch(createRole(roleObject)).then(response => {
        if (!response.error) {
          dispatch(
            notificationEdit({
              id: name,
              message: `Created ${name} role`,
              kind: 'success',
              dismissAfter: 3000,
            }),
          );
          dispatch(reset('create-role'));
        }
      });
    }
  };

  render() {
    const { buttonText, isLoading, handleSubmit } = this.props;

    return (
      <FormButton
        buttonText={buttonText}
        onSubmit={handleSubmit(this.handleCreateRole)}
      >
        <Field
          name="submitButton"
          type="submit"
          component={Button}
          text={buttonText || 'Create Role'}
          permission="EDIT_ROLE"
          size="large"
          isSubmitting={isLoading}
          appearance={buttonText === 'Delete Role' ? 'secondary' : 'primary'}
        />
      </FormButton>
    );
  }
}
RolesCreateFormSubmit = reduxForm({
  form: 'create-role',
})(RolesCreateFormSubmit);

RolesCreateFormSubmit = connect(state => ({
  isLoading: state.users.creatingUser || state.profile.isUpdating,
  user: state.user,
}))(RolesCreateFormSubmit);

export default RolesCreateFormSubmit;
