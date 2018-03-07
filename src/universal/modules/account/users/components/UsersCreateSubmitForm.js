import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form';
import { Button } from '../../../ui/components';
import { createUser, updateUserProfile } from 'grow-actions/user/user';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions/';
import { AUTH_UPDATE_PERMISSION } from 'grow-actions/auth/constants';

class UsersCreateSubmitForm extends Component {
  handleCreateUser = values => {
    const { dispatch, profileId, buttonText, userId } = this.props;
    const name = values.firstName;
    const randomId = Math.random();

    if (buttonText === 'Save') {
      dispatch(
        notificationPush({
          id: profileId,
          message: `Saving ${name}'s profile`,
          kind: 'loading',
        }),
      );

      dispatch(updateUserProfile(profileId, values)).then(response => {
        const { user } = response.payload.data;

        dispatch(
          notificationEdit({
            id: profileId,
            message: `Saved ${name}'s profile`,
            kind: 'success',
            dismissAfter: 3000,
          }),
        );

        // if admin is updating his own role
        if (user.id === userId) {
          dispatch({
            type: AUTH_UPDATE_PERMISSION,
            payload: user.permissions,
          });
        }
      });
    } else {
      dispatch(
        notificationPush({
          id: randomId,
          message: `Creating ${name}'s profile`,
          kind: 'loading',
        }),
      );

      dispatch(createUser(values)).then(response => {
        if (!response.payload.errors.length) {
          dispatch(
            notificationEdit({
              id: randomId,
              message: `Created ${name}'s profile`,
              kind: 'success',
              dismissAfter: 3000,
            }),
          );
        } else {
          // to dismiss the original "Creating xxx profile message"
          dispatch(
            notificationEdit({
              id: randomId,
              kind: 'error',
              dismissAfter: 500,
            }),
          );
        }
        if (!response.error) {
          dispatch(reset('create-user'));
        }
      });
    }
  };

  render() {
    const { buttonText, isLoading, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleCreateUser)}>
        <Field
          name="submitButton"
          type="submit"
          component={Button}
          text={buttonText || 'Create User'}
          permission={
            buttonText === 'Save' ? 'EDIT_ROLE' : 'EDIT_ADMINISTRATOR'
          }
          isSubmitting={isLoading}
          size="large"
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.users.creatingUser || state.profile.isUpdating,
  profileId: state.profile.id,
  userId: state.user.id,
});

UsersCreateSubmitForm.defaultProps = {
  isLoading: undefined,
  profileId: undefined,
  userId: undefined,
};

UsersCreateSubmitForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string,
  profileId: PropTypes.string,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

UsersCreateSubmitForm = reduxForm({
  form: 'create-user',
})(UsersCreateSubmitForm);

UsersCreateSubmitForm = connect(mapStateToProps)(UsersCreateSubmitForm);

export default UsersCreateSubmitForm;
