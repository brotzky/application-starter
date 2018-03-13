import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import {
  QueueItemCell,
  QueueItemLink,
  QueueItem as QueueItemList,
  QueueActions,
  QueueActionsItemButton,
  QueueActionsItemLink,
  QueueActionsItemLinkSub,
  QueueActionsItemLinkMain,
  QueueItemMenuDotsIcon,
} from 'gac-utils/sc';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { capitalizeString } from 'grow-utils/stringFormatting';
import {
  TOGGLE_ACTION_MENU,
  updateQueueState,
} from '../actions/actions-update-queue-state';
import { Button, Ellipsis, ProfilePicture, Pill } from '../../ui/components';
import { showModal } from '../../ui/modal/actions/actions-modal';
import JointIcons from '../../ui/joint-icons/';
import {
  handleClaimClick,
  handleUnclaimClick,
} from '../../../utils/claim-unclaim';

const StatePill = Pill.withComponent(Link);

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    ${props =>
      props.isRep &&
      `
      cursor: pointer;
      text-decoration: line-through
    `};
  }
`;

const ProfilePictureContainer = styled.div`
  padding-right: 10px;
`;

const UserTextContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ExistingUserNotification = styled.span`
  background: ${props =>
    props.isExistingUser ? props.theme.colors.blue : 'rgb(201, 209, 214)'};
  padding: 2px;
  color: white;
  font-weight: 700;
  border-radius: 50%;
  margin: 6px 6px 0 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8px;
  min-width: 8px;
`;

const QueueItemWrapper = styled.ul`
  min-height: 58px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;
const QueueActionsItemMenuButton = styled.button`
  border: none;
`;

class QueueItem extends Component {
  handleActionMenuClick = (event, id) => {
    event.nativeEvent.stopImmediatePropagation();
    const { dispatch, showQueueMenu } = this.props;
    if (id) {
      document.addEventListener('click', this.handleCloseActionMenu);
      if (id === showQueueMenu) {
        return dispatch(updateQueueState(TOGGLE_ACTION_MENU));
      }
      return dispatch(updateQueueState(TOGGLE_ACTION_MENU, id));
    }
  };

  handleCloseActionMenu = () => {
    this.props.dispatch(updateQueueState(TOGGLE_ACTION_MENU));
    document.removeEventListener('click', this.handleCloseActionMenu);
  };

  handleAssignClick = application => {
    const { dispatch } = this.props;
    return dispatch(
      showModal('QUEUE_ASSIGN_APPLICATION_MODAL', {
        application,
      }),
    );
  };

  hasPermission(permission) {
    const { permissions } = this.props;
    return Boolean(permissions[permission]);
  }

  pillColor = value => {
    switch (value) {
      case 'active':
        return 'success';
      case 'declined':
      case 'fraud':
      case 'cancelled':
        return 'error';
      default:
        return null;
    }
  };

  render() {
    const { item, showQueueMenu, user, queue, org, dispatch } = this.props;
    const Application = productApplication(org, item);
    const workbenchLink = Application.getWorkbenchLink();
    const memberLink = Application.getMemberLink();
    const productLink = Application.getProductLink();
    const productName = Application.getPrettyName();
    const currentStep = Application.getMaskedStatus();
    const isExistingUser = item.creator.isExisting;

    return (
      <QueueItemList>
        <QueueItemWrapper>
          <QueueItemCell title={productName} style={{ flex: '1.3' }}>
            <QueueItemLink to={workbenchLink}>
              <QueueActionsItemLinkMain style={{ display: 'flex' }}>
                <JointIcons application={item} />
                <Ellipsis>{productName}</Ellipsis>
              </QueueActionsItemLinkMain>
              <QueueActionsItemLinkSub>
                {moment(item.dateCreated).format('MMM D YYYY, h:mm a')}
              </QueueActionsItemLinkSub>
            </QueueItemLink>
          </QueueItemCell>
          <QueueItemCell
            title={`${item.creator.firstName} ${item.creator.lastName}`}
            style={{ flex: '1.25' }}
          >
            <QueueItemLink to={memberLink}>
              <QueueActionsItemLinkMain
                style={{ display: 'flex', alignItems: 'flex-start' }}
              >
                <ExistingUserNotification isExistingUser={isExistingUser} />
                <div>
                  {item.creator.firstName} {item.creator.lastName}
                  <QueueActionsItemLinkSub>
                    {item.creator.email}
                  </QueueActionsItemLinkSub>
                </div>
              </QueueActionsItemLinkMain>
            </QueueItemLink>
          </QueueItemCell>
          <QueueItemCell title={currentStep} style={{ flex: '0.7' }}>
            <QueueItemLink to={workbenchLink}>{currentStep}</QueueItemLink>
          </QueueItemCell>
          <QueueItemCell title={item.state} style={{ flex: '0.7' }}>
            <QueueItemLink to={workbenchLink}>
              {item.adminSteps ? (
                item.adminSteps.currentStep.prettyName
              ) : (
                <span style={{ opacity: '0.6' }}>–</span>
              )}
            </QueueItemLink>
          </QueueItemCell>
          <QueueItemCell title={item.state} style={{ flex: '0.7' }}>
            <StatePill state={this.pillColor(item.state)} to={workbenchLink}>
              {capitalizeString(item.state, '-', ' ')}
            </StatePill>
          </QueueItemCell>
          <QueueItemCell title={item.primaryRep.email} style={{ flex: '1' }}>
            {item.primaryRep.email ? (
              <UserContainer
                onClick={
                  item.primaryRep.email === user.email
                    ? () => handleUnclaimClick(dispatch, Application)
                    : () => {}
                }
                isRep={item.primaryRep.email === user.email}
              >
                <ProfilePictureContainer>
                  <ProfilePicture size={34} user={item.primaryRep} />
                </ProfilePictureContainer>
                <UserTextContainer>
                  <QueueActionsItemLinkMain>
                    {item.primaryRep.firstName} {item.primaryRep.lastName}
                  </QueueActionsItemLinkMain>
                  <QueueActionsItemLinkSub>
                    {item.primaryRep.email}
                  </QueueActionsItemLinkSub>
                </UserTextContainer>
              </UserContainer>
            ) : (
              <Button
                onClick={() =>
                  handleClaimClick(dispatch, Application, user.email)
                }
                text="Claim"
                permission="CLAIM_UNCLAIM_APPLICATION"
                isSubmitting={queue.isUpdating}
              />
            )}
          </QueueItemCell>
          <QueueItemCell style={{ flex: '0.2', textAlign: 'right' }}>
            <QueueActionsItemMenuButton
              onClick={event => this.handleActionMenuClick(event, item.id)}
            >
              <QueueItemMenuDotsIcon vertical={true} />
            </QueueActionsItemMenuButton>
            {showQueueMenu === item.id && (
              <QueueActions>
                {false &&
                  productLink && (
                    <QueueActionsItemLink to={productLink}>
                      View Product
                    </QueueActionsItemLink>
                  )}
                <QueueActionsItemLink to={memberLink}>
                  View Member Profile
                </QueueActionsItemLink>
                <QueueActionsItemLink to={workbenchLink}>
                  Application
                </QueueActionsItemLink>
                {item.primaryRep.email === user.email && (
                  <QueueActionsItemButton
                    onClick={() => handleUnclaimClick(dispatch, Application)}
                  >
                    Unclaim Application
                  </QueueActionsItemButton>
                )}
                {this.hasPermission('ASSIGN_APPLICATION') && (
                  <QueueActionsItemButton
                    onClick={() => this.handleAssignClick(Application)}
                  >
                    Assign Application
                  </QueueActionsItemButton>
                )}
              </QueueActions>
            )}
          </QueueItemCell>
        </QueueItemWrapper>
      </QueueItemList>
    );
  }
}

QueueItem.defaultProps = {
  showQueueMenu: undefined,
};

QueueItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  ).isRequired,
  showQueueMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
  org: PropTypes.string.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};

const mapStateToProps = state => ({
  org: state.auth.organization,
  queue: state.queue,
});

export default connect(mapStateToProps)(QueueItem);
