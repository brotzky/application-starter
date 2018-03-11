import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { unlockUser } from 'grow-actions/user/user';
import {
  notificationPush,
  notificationEdit,
} from '../../../ui/notifications/actions';
import UsersDeactivate from '../../users/components/UsersDeactivate';
import { Button } from '../../../ui/components';

const ProfileHeader = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

const ProfileText = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.greyDark};
  margin-bottom: 1.5em;
`;

class ProfileManageAccountSection extends Component {
  onUnlockClick = userId => {
    const {
      notificationPush,
      notificationEdit,
      profile: { firstName },
      dispatch,
    } = this.props;

    notificationPush({
      id: userId,
      kind: 'loading',
      message: `Unlocking ${firstName}'s account...`,
    });
    dispatch(unlockUser(userId)).then(({ errors, errorMessage }) => {
      const error = errors && errors.length > 0;

      notificationEdit({
        id: userId,
        kind: error ? 'error' : 'success',
        message: error
          ? `We can't unlock this account: ${errorMessage}.`
          : `${firstName}'s account is active.`,
        dismissAfter: 5000,
      });
    });
  };

  render() {
    const {
      dispatch,
      profile: { accountLocked, firstName, id, isFetching },
      isUsersProfile,
    } = this.props;

    return (
      <div>
        {!isFetching && accountLocked ? (
          <div>
            <ProfileHeader>This account is locked.</ProfileHeader>
            <Button
              onClick={() => this.onUnlockClick(id)}
              text="Unlock"
              appearance="default"
              permission="UNLOCK_ADMIN_ACCOUNT"
            />
          </div>
        ) : (
          <div>
            <ProfileHeader>This account is active.</ProfileHeader>
            <ProfileText>
              {firstName} is able to log in and access the Grow Admin Console.
              Deacitvating an account cannot be undone.
            </ProfileText>
          </div>
        )}
        <UsersDeactivate dispatch={dispatch} />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  dispatch,
  unlockUser,
  notificationPush,
  notificationEdit,
}))(ProfileManageAccountSection);
