import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getUsers } from 'grow-actions/user/user';
import { updateProductApplication } from 'grow-actions/product-applications/product-applications';
import ModalContent from '../../ui/modal/components/ModalContent';
import { hideModal } from '../../ui/modal/actions/actions-modal';
import { FadeIn } from '../../ui/transitions/';
import { Button } from '../../ui/components';
import Spinner from '../../ui/spinner/spinner';

const QueueItem = styled.li`
  padding: 0 2.4rem;
  position: relative;
  background: white;

  &:nth-child(even) {
    background: #fafafa;
  }
`;

const QueueItemCellBase = styled.div`
  display: block;
  flex: 1;
  padding: 1.37rem 1.37rem 1.37rem 0;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.black};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;

  &:last-child {
    padding-right: 0;
  }
`;

const QueueItemCell = QueueItemCellBase.extend`
  flex: 2;
`;

const QueueItemButtonWrap = QueueItemCellBase.withComponent('span');

const QueueItemButtonWrapper = QueueItemButtonWrap.extend`
  text-align: right;
`;

const QueueWrapper = styled.div`
  margin: 0 auto;
  min-height: 58px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const QueueList = styled.ul`
  list-style-type: none;
  max-height: 250px;
  overflow-y: scroll;
  border: 1px solid #e3e3e3;
  border-radius: 2px;
`;

const Heading = styled.h3`
  display: block;
  margin-bottom: 3.4rem;
  font-size: 5rem;
  font-weight: 600;
  line-height: 1.5;
`;
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

    return dispatch(updateProductApplication(application.getId(), body)).then(
      () => {
        dispatch(hideModal());
      },
    );
  }

  renderUsersList(users, currentUser, primaryRep) {
    return (
      <QueueList>
        <FadeIn>
          {users
            .filter(
              user =>
                user.email !== currentUser.email && user.email !== primaryRep,
            )
            .map(user => (
              <QueueItem key={user.email}>
                <QueueWrapper>
                  <QueueItemCell>
                    <div style={{ fontWeight: 500 }}>
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.email}</div>
                  </QueueItemCell>

                  <QueueItemButtonWrapper>
                    <Button
                      onClick={() => this.handleAssignClick(user)}
                      permission="CLAIM_UNCLAIM_APPLICATION"
                      text="Assign"
                    />
                  </QueueItemButtonWrapper>
                </QueueWrapper>
              </QueueItem>
            ))}
        </FadeIn>
      </QueueList>
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
        <div>
          <Heading>
            Assign this {application.getPrettyName()} application
          </Heading>
          <p style={{ marginBottom: '4.8rem' }}>
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
