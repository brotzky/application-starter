import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { productApplication } from 'grow-utils/productApplicationUtils';
import {
  TOGGLE_ACTION_MENU,
  updateQueueState,
} from '../actions/actions-update-queue-state';
import { Button, ProfilePicture } from '../../ui/components';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import { showModal } from '../../ui/modal/actions/actions-modal';
import { MenuDots } from '../../ui/icons/';
import { FadeIn, Transition } from '../../ui/transitions';
import JointIcons from '../../ui/joint-icons/';
import {
  handleClaimClick,
  handleUnclaimClick,
} from '../../../utils/claim-unclaim';

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePictureContainer = styled.div`
  padding-right: 10px;
`;

const UserTextContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StatePill = styled(Link)`
  padding: 2px 10px 3px;

  ${props => {
    switch (props.state) {
      case 'active':
        return `
          color: #159e70;
          background: rgba(37, 180, 126, 0.14);
          font-size: 1.2rem;
          font-weight: 500;
        `;
      case 'declined':
        return `
          color: ${props.theme.colors.red};
          background: #ffecec;
          font-size: 1.2rem;
          font-weight: 500;
        `;
      default:
        return `font-size: 1.4rem;`;
    }
  }};
  border-radius: 30px;
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
class QueueItem extends Component {
  constructor(props) {
    super(props);
    this.handleActionMenuClick = this.handleActionMenuClick.bind(this);
    this.handleCloseActionMenu = this.handleCloseActionMenu.bind(this);
  }

  handleActionMenuClick(event, id) {
    event.nativeEvent.stopImmediatePropagation();
    const { dispatch, showQueueMenu } = this.props;
    if (id) {
      document.addEventListener('click', this.handleCloseActionMenu);
      if (id === showQueueMenu) {
        return dispatch(updateQueueState(TOGGLE_ACTION_MENU));
      }
      return dispatch(updateQueueState(TOGGLE_ACTION_MENU, id));
    }
  }

  handleCloseActionMenu() {
    this.props.dispatch(updateQueueState(TOGGLE_ACTION_MENU));
    document.removeEventListener('click', this.handleCloseActionMenu);
  }

  handleAssignClick(application) {
    const { dispatch } = this.props;
    return dispatch(
      showModal('QUEUE_ASSIGN_APPLICATION_MODAL', {
        application,
      }),
    );
  }

  hasPermission(permission) {
    const { permissions } = this.props;
    return Boolean(permissions[permission]);
  }

  render() {
    const { item, showQueueMenu, user, org, dispatch } = this.props;
    const Application = productApplication(org, item);
    const workbenchLink = Application.getWorkbenchLink();
    const memberLink = Application.getMemberLink();
    const productLink = Application.getProductLink();
    const productName = Application.getPrettyName();
    const currentStep = Application.getMaskedStatus();
    const isExistingUser = item.creator.isExisting;

    return (
      <li className="QueueItem">
        <FadeIn>
          <ul className="Queue__wrapper QueueItem__wrapper">
            <li
              className="QueueItem__cell"
              title={productName}
              style={{ flex: '1.2' }}
            >
              <Link className="QueueItem__link" to={workbenchLink}>
                <div
                  className="QueueItem__link-main"
                  style={{ display: 'flex' }}
                >
                  <JointIcons application={item} />
                  <span className="QueueItem__link-product">{productName}</span>
                </div>
                <div className="QueueItem__link-sub">
                  {moment(item.dateCreated).format('MMM D YYYY, h:mm a')}
                </div>
              </Link>
            </li>
            <li
              className="QueueItem__cell"
              title={`${item.creator.firstName} ${item.creator.lastName}`}
              style={{ flex: '1.25' }}
            >
              <Link className="QueueItem__link" to={memberLink}>
                <div
                  className="QueueItem__link-main"
                  style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                  <ExistingUserNotification isExistingUser={isExistingUser} />
                  <div>
                    {item.creator.firstName} {item.creator.lastName}
                    <div className="QueueItem__link-sub">
                      {item.creator.email}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li
              className="QueueItem__cell"
              title={currentStep}
              style={{ flex: '0.7' }}
            >
              <Link className="QueueItem__link" to={workbenchLink}>
                {currentStep}
              </Link>
            </li>
            <li
              className="QueueItem__cell"
              title={item.state}
              style={{ flex: '0.6' }}
            >
              <Link className="QueueItem__link" to={workbenchLink}>
                {item.adminSteps ? (
                  item.adminSteps.currentStep.prettyName
                ) : (
                  <span style={{ opacity: '0.6' }}>–</span>
                )}
              </Link>
            </li>
            <li
              className="QueueItem__cell"
              title={item.state}
              style={{ flex: '0.7' }}
            >
              <StatePill state={item.state} to={workbenchLink}>
                {capitalizeString(item.state, '-', ' ')}
              </StatePill>
            </li>
            <li
              className="QueueItem__cell"
              title={item.primaryRep.email}
              style={{ overflow: 'visible', width: '0px' }}
            >
              {item.primaryRep.email ? (
                item.primaryRep.email === user.email ? (
                  <button
                    className="QueueItem__isRep"
                    onClick={() => handleUnclaimClick(dispatch, Application)}
                  >
                    <UserContainer>
                      <ProfilePictureContainer>
                        <ProfilePicture size={34} user={item.primaryRep} />
                      </ProfilePictureContainer>
                      <UserTextContainer>
                        <div className="QueueItem__link-main">
                          {item.primaryRep.firstName} {item.primaryRep.lastName}
                        </div>
                        <div className="QueueItem__link-sub">
                          {item.primaryRep.email}
                        </div>
                      </UserTextContainer>
                    </UserContainer>
                  </button>
                ) : (
                  <UserContainer>
                    <ProfilePictureContainer>
                      <ProfilePicture size={34} user={item.primaryRep} />
                    </ProfilePictureContainer>
                    <UserTextContainer>
                      <div className="QueueItem__link-main">
                        {item.primaryRep.firstName} {item.primaryRep.lastName}
                      </div>
                      <div className="QueueItem__link-sub">
                        {item.primaryRep.email}
                      </div>
                    </UserTextContainer>
                  </UserContainer>
                )
              ) : (
                <Button
                  onClick={() =>
                    handleClaimClick(dispatch, Application, user.email)
                  }
                  text="Claim"
                  permission="CLAIM_UNCLAIM_APPLICATION"
                />
              )}
            </li>
            <li className="QueueItem__cell QueueItem__cell--sm QueueItem__cell--align-right">
              <button
                className="QueueItem__menu-dots"
                onClick={event => this.handleActionMenuClick(event, item.id)}
              >
                <MenuDots
                  className={`QueueItem__menu-dots-icon ${addClassNameIf(
                    showQueueMenu === item.id,
                    'QueueItem__menu-dots-icon--active',
                  )}`}
                />
              </button>
              <Transition transitionName="QueueActions">
                {showQueueMenu === item.id && (
                  <div className="QueueActions">
                    {/* Removing this for cherry POC. We don't support a product page anywhere in GAC */}
                    {false &&
                      productLink && (
                        <Link className="QueueActions__item" to={productLink}>
                          View Product
                        </Link>
                      )}
                    <Link className="QueueActions__item" to={memberLink}>
                      View Member Profile
                    </Link>
                    <Link className="QueueActions__item" to={workbenchLink}>
                      Application
                    </Link>
                    {item.primaryRep.email && (
                      <button
                        className="QueueActions__item"
                        onClick={() =>
                          handleUnclaimClick(dispatch, Application)
                        }
                      >
                        Unclaim Application
                      </button>
                    )}
                    {this.hasPermission('ASSIGN_APPLICATION') && (
                      <button
                        className="QueueActions__item"
                        onClick={() => this.handleAssignClick(Application)}
                      >
                        Assign Application
                      </button>
                    )}
                  </div>
                )}
              </Transition>
            </li>
          </ul>
        </FadeIn>
      </li>
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
  showQueueMenu: PropTypes.string,
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
});

export default connect(mapStateToProps)(QueueItem);
