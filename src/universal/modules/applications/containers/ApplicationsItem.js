import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { Action } from '../../ui/components';
import {
  Button,
  ViewPermission,
  ImageGroup,
  Tooltip,
  TextBox,
  Table,
  ProfilePicture,
} from '../../ui/components';
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
import ProfileCard from '../components/ProfileCard';
const StatePill = styled(Link)`
  padding: 2px 14px 3px;

  ${props => {
    switch (props.state) {
      case 'active':
        return `
          background: rgba(37, 180, 126, 0.14);
        `;
      case 'declined':
        return `
          background: #ffecec;
        `;
      default:
        return `font-size: 1.4rem;`;
    }
  }};
  color: #262626;
  font-size: 1.4rem;
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

const QueueLink = styled(Link)`
  cursor: pointer;

  &:hover span {
    text-decoration: underline;
    color: black;
  }
`;

const QueueLinkContent = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  margin-bottom: 1px;
  display: flex;
`;

const ActionButton = styled.button`
  height: 100%;
  width: 100%;
  text-align: left;
`;

const CeatorName = styled.div`
  margin: 1px 0 0 12px;
`;

class ApplicationsItem extends Component {
  state = {
    isActionMenuOpen: false,
  };

  handleActionMenuClick = (event, id) => {
    event.nativeEvent.stopImmediatePropagation();
    const { isActionMenuOpen } = this.state;
    document.addEventListener('click', this.handleCloseActionMenu);
    this.setState({ isActionMenuOpen: !isActionMenuOpen });
  };

  handleCloseActionMenu = () => {
    this.setState({ isActionMenuOpen: false });
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
  /**
   * Strip a url to get the last visited page.
   * '/<partner>/apply/<page>'
   */
  getLastVisitedUrl = url => {
    return url && url.split('/')[3]
      ? capitalizeString(url.split('/')[3], '-', ' ')
      : 'N/A';
  };
  render() {
    const { item, showQueueMenu, user, org, dispatch } = this.props;
    const Application = productApplication(org, item);
    const workbenchLink = Application.getWorkbenchLink();
    const memberLink = Application.getMemberLink();
    const productLink = Application.getProductLink();
    const productName = Application.getPrettyName();
    const currentStep = Application.getMaskedStatus();
    const isExistingUser = item.creator.isExisting;
    const repIsCurrentUser =
      item.primaryRep.email && item.primaryRep.email === user.email;
    const { isActionMenuOpen } = this.state;

    return (
      <FadeIn component={Table.Row}>
        <Table.Cell style={{ width: '20%' }}>
          <QueueLink to={workbenchLink}>
            <QueueLinkContent>
              <JointIcons application={item} />
              <span>
                {moment(item.dateCreated).format('MMM D YYYY, h:mm a')}
              </span>
            </QueueLinkContent>
          </QueueLink>
        </Table.Cell>
        <Table.Cell>
          <Tooltip
            content={
              <QueueLink to={memberLink}>
                <QueueLinkContent style={{ display: 'table' }}>
                  <TextBox
                    background={isExistingUser ? '#3772cc' : '#BFC7CC'}
                    height="22"
                    width="28"
                  >
                    {item.creator.firstName[0]}
                    {item.creator.lastName[0]}
                  </TextBox>
                  <CeatorName>
                    <span>
                      {item.creator.firstName} {item.creator.lastName}
                    </span>
                  </CeatorName>
                </QueueLinkContent>
              </QueueLink>
            }
          >
            <ProfileCard>
              <ProfileCard.Row bordered alignItems="center">
                <div
                  style={{
                    paddingRight: '10px',
                    minWidth: '45px',
                  }}
                >
                  <TextBox
                    background={isExistingUser ? '#3772cc' : '#BFC7CC'}
                    height="42"
                    width="42"
                    circular
                  >
                    {item.creator.firstName[0]}
                    {item.creator.lastName[0]}
                  </TextBox>
                </div>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    <QueueLink to={memberLink}>
                      {item.creator.firstName} {item.creator.lastName}
                    </QueueLink>
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                    }}
                    title={item.creator.email}
                  >
                    {item.creator.email}
                  </span>
                </div>
              </ProfileCard.Row>
              <ProfileCard.Row alignItems="center">
                <div>
                  <ProfileCard.Header>Signed up</ProfileCard.Header>
                  <ProfileCard.Sub>
                    {moment(new Date()).diff(moment(item.dateCreated), 'days') +
                      ' days ago'}
                  </ProfileCard.Sub>
                </div>
                <div>
                  <ProfileCard.Header>Last seen</ProfileCard.Header>{' '}
                  <ProfileCard.Sub>
                    {item.lastVisited
                      ? moment(new Date()).diff(
                          moment(item.lastVisited.date),
                          'days',
                        ) + ' days ago'
                      : 'N/A'}
                  </ProfileCard.Sub>
                </div>
                <div>
                  <ProfileCard.Header right>Last visited</ProfileCard.Header>
                  <ProfileCard.Sub right>
                    {item.lastVisited
                      ? this.getLastVisitedUrl(item.lastVisited.url)
                      : 'N/A'}
                  </ProfileCard.Sub>
                </div>
              </ProfileCard.Row>
            </ProfileCard>
          </Tooltip>
        </Table.Cell>
        <Table.Cell>
          <QueueLink to={workbenchLink}>
            <span>{currentStep}</span>
          </QueueLink>
        </Table.Cell>
        <Table.Cell>
          <QueueLink to={workbenchLink}>
            {item.adminSteps ? (
              <span>{item.adminSteps.currentStep.prettyName}</span>
            ) : (
              <span style={{ opacity: '0.6' }}>–</span>
            )}
          </QueueLink>
        </Table.Cell>
        <Table.Cell>
          <StatePill state={item.state} to={workbenchLink}>
            {capitalizeString(item.state, '-', ' ')}
          </StatePill>
        </Table.Cell>
        <Table.Cell style={{ height: '54px', width: '10%' }}>
          {item.primaryRep.email ? (
            <div
              onClick={
                repIsCurrentUser
                  ? () => handleUnclaimClick(dispatch, Application, user.email)
                  : () => {}
              }
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ProfilePicture user={item.primaryRep} />{' '}
              <div style={{ marginLeft: '14px' }}>
                {item.primaryRep.firstName} {item.primaryRep.lastName}
              </div>
            </div>
          ) : (
            <Button
              appearance="default"
              permission="CLAIM_UNCLAIM_APPLICATION"
              text="claim"
              size="small"
              onClick={() =>
                handleClaimClick(dispatch, Application, user.email)
              }
            />
          )}
        </Table.Cell>
      </FadeIn>
    );
  }
}

ApplicationsItem.defaultProps = {
  showQueueMenu: undefined,
};

ApplicationsItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  ).isRequired,
  showQueueMenu: PropTypes.string,
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

export default connect(mapStateToProps)(ApplicationsItem);
