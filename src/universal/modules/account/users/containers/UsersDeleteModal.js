import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { deleteUser } from 'grow-actions/user/user';
import { authLogout } from 'grow-actions/auth/auth-logout';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { Button } from '../../../ui/components';
import { hideModal } from '../../../ui/modal/actions/actions-modal';

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const Heading = styled.h3`
  display: block;
  margin-bottom: 3.4rem;
  font-size: 5rem;
  font-weight: 600;
  line-height: 1.5;
`;

const UsersDeleteList = styled.ul`
  color: $text-color;
  padding-left: 20px;

  li {
    margin-bottom: 15px;
  }
`;
class UserDeleteModal extends Component {
  handleDeleteClick = () => {
    const { dispatch, user, currentUser } = this.props;

    dispatch(deleteUser(currentUser.id)).then(res => {
      if (!res.payload.errors.length) {
        dispatch(hideModal());

        /**
         * We want to redirect to the login page if a user deletes themselves
         * otherwise just take them back to the users page.
         */
        if (user.id === currentUser.id) {
          dispatch(authLogout()).then(() => dispatch(push('/login')));
        } else {
          dispatch(push('/account/users'));
        }
      }
    });
  };

  render() {
    const { dispatch, profile, currentUser } = this.props;
    const fullName = currentUser ? (
      <strong>
        {currentUser.firstName} {currentUser.lastName}
      </strong>
    ) : (
      <strong>
        {profile.firstName} {profile.lastName}
      </strong>
    );

    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}
      >
        <Heading>Deactivate user</Heading>
        <div style={{ width: '400px' }}>
          <p>Please confirm the deactivation of {fullName}</p>
          <UsersDeleteList>
            <li>{fullName} will lose login access to Grow Admin Console.</li>
            <li>
              {fullName} will still be visible on applications they particated
              in, notes they have left, and all other interactions they created.
            </li>
          </UsersDeleteList>
          <ButtonWrapper>
            <Button
              permission="EDIT_PROFILE"
              appearance="primary"
              onClick={this.handleDeleteClick}
              text="Confirm"
              size="large"
              isSubmitting={profile.isDeleting}
            />
          </ButtonWrapper>
        </div>
      </ModalContent>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user,
});

export default connect(mapStateToProps)(UserDeleteModal);
