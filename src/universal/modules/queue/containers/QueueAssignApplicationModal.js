import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from 'grow-actions/user/user';
import { updateProductApplication } from 'grow-actions/product-applications/product-applications';
import ModalContent from '../../ui/modal/components/ModalContent';
import { hideModal } from '../../ui/modal/actions/actions-modal';
import { FadeIn } from '../../ui/transitions/';
import { Button } from '../../ui/components';
import Spinner from '../../ui/spinner/spinner';

class QueueAssignApplicationModal extends Component {
  static propTypes = {
    application: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    primaryRep: PropTypes.object,
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { dispatch, users: { isFetching, users } } = this.props;
    if (!users.length && !isFetching) {
      return dispatch(getUsers());
    }
  }

  handleAssignClick(user) {
    const { application, dispatch } = this.props;
    const body = { primaryRep: user.email, currentStep: null };

    return dispatch(
      updateProductApplication(application.getId(), body),
    ).then(() => {
      dispatch(hideModal());
    });
  }

  renderUsersList(users, currentUser, primaryRep) {
    return (
      <ul className="QueueList QueueAssignApplication">
        <FadeIn>
          {users
            .filter(
              user =>
                user.email !== currentUser.email && user.email !== primaryRep,
            )
            .map(user => (
              <li key={user.email} className="QueueItem">
                <div className="Queue__wrapper QueueItem__wrapper">
                  <div style={{ flex: 2 }} className="QueueItem__cell">
                    <div style={{ fontWeight: 500 }}>
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.email}</div>
                  </div>

                  <span
                    className="QueueItem__cell"
                    style={{ textAlign: 'right' }}
                  >
                    <Button
                      onClick={() => this.handleAssignClick(user)}
                      permission="CLAIM_UNCLAIM_APPLICATION"
                      text="Assign"
                    />
                  </span>
                </div>
              </li>
            ))}
        </FadeIn>
      </ul>
    );
  }

  render() {
    const {
      application,
      dispatch,
      primaryRep,
      user,
      users: { isFetching, users },
    } = this.props;
    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}
      >
        <div className="QueueAssignApplicationModal">
          <h3 className="u-heading-5">
            Assign this {application.getPrettyName()} application
          </h3>
          <p className="QueueAssignApplicationModal__copy">
            Select the user you would like to assign this application to.
          </p>
          {isFetching ? (
            <Spinner color="#448AFF" />
          ) : (
            this.renderUsersList(users, user, primaryRep)
          )}
        </div>
      </ModalContent>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  primaryRep: state.workbench.primaryRep,
});

export default connect(mapStateToProps)(QueueAssignApplicationModal);
