import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { capitalizeString } from 'grow-utils/stringFormatting';
import {
  QueueItemHeading,
  QueueHeader,
  QueueItemList,
  QueueItemCell,
  QueueItemIsRep,
  QueueItemLink,
} from 'gac-utils/sc';
import { Button, EmptyState } from '../../ui/components';
import QueueItem from '../../queue/containers/QueueItem';
import QueuePlaceholder from '../../queue/components/QueuePlaceholder';
import JointIcons from '../../ui/joint-icons/';
import { EmptyBox, EmptyFolder } from '../../ui/icons/';
import {
  handleClaimClick,
  handleUnclaimClick,
} from '../../../utils/claim-unclaim';

const QueueItemWrapper = styled.ul`
  min-height: 58px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const MemberProductApplicationsWrapper = styled.div`
  flex: 1;
  align-self: flex-start;
  background: white;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
`;

const StyledQueueList = styled.ul`
  list-style-type: none;
`;

const StyledQueueItem = styled.li`
  padding: (0) (${props => `${props.theme.space}rem`});
  position: relative;
  background: white;
`;

const StyledQueueItemWrapper = styled.ul`
  min-height: 58px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

class MemberProductApplications extends QueueItem {
  render() {
    const { member, products, user, org, dispatch } = this.props;
    const { isFetching, productApplications } = member;

    return (
      <MemberProductApplicationsWrapper>
        <QueueHeader style={{ padding: '0 2.4rem' }}>
          <StyledQueueList>
            <StyledQueueItem>
              <StyledQueueItemWrapper>
                <QueueItemCell>
                  <QueueItemHeading>Product</QueueItemHeading>
                </QueueItemCell>
                <QueueItemCell>
                  <QueueItemHeading>Manager</QueueItemHeading>
                </QueueItemCell>
                <QueueItemCell>
                  <QueueItemHeading>Status</QueueItemHeading>
                </QueueItemCell>
                <QueueItemCell>
                  <QueueItemHeading>Date Created</QueueItemHeading>
                </QueueItemCell>
              </StyledQueueItemWrapper>
            </StyledQueueItem>
          </StyledQueueList>
        </QueueHeader>
        {isFetching ? (
          <QueuePlaceholder />
        ) : (
          <div>
            <ul style={{ listStyleType: 'none' }}>
              {productApplications.map(application => {
                if (application.currentStep === 'serving' && !products) {
                  return null;
                }
                if (products && application.currentStep !== 'serving') {
                  return null;
                }
                const Application = productApplication(org, application);
                const workbenchLink = Application.getWorkbenchLink();
                const currentStep =
                  application.state && application.state !== 'active'
                    ? `${Application.getMaskedStatus()} (${capitalizeString(
                        application.state,
                      )})`
                    : Application.getMaskedStatus();

                return (
                  <QueueItemList key={application.id}>
                    <QueueItemWrapper>
                      <QueueItemCell>
                        <QueueItemLink to={workbenchLink}>
                          <JointIcons application={application} />{' '}
                          {application.prettyName}
                        </QueueItemLink>
                      </QueueItemCell>
                      <QueueItemCell>
                        {application.primaryRep.email ? (
                          application.primaryRep.email === user.email ? (
                            <QueueItemIsRep
                              onClick={() =>
                                handleUnclaimClick(dispatch, Application)
                              }
                            >
                              {application.primaryRep.email}
                            </QueueItemIsRep>
                          ) : (
                            application.primaryRep.email
                          )
                        ) : (
                          <Button
                            onClick={() =>
                              handleClaimClick(
                                dispatch,
                                Application,
                                user.email,
                              )
                            }
                            text="Claim"
                            id="ClaimApplication"
                            permission="CLAIM_UNCLAIM_APPLICATION"
                          />
                        )}
                      </QueueItemCell>
                      <QueueItemCell>
                        <QueueItemLink id="queueStep" to={workbenchLink}>
                          {currentStep}
                        </QueueItemLink>
                      </QueueItemCell>
                      <QueueItemCell>
                        {moment(application.dateCreated).format(
                          'MMM D YYYY, h:mm a',
                        )}
                      </QueueItemCell>
                    </QueueItemWrapper>
                  </QueueItemList>
                );
              })}
            </ul>
            {products &&
            productApplications.filter(a => a.currentStep === 'serving')
              .length < 1 &&
            member.member.id &&
            !isFetching ? (
              <EmptyState
                Icon={EmptyBox}
                text={`No products for ${member.member.firstName} ${
                  member.member.lastName
                } found`}
              />
            ) : null}
            {!products &&
            productApplications.filter(a => a.currentStep !== 'serving')
              .length < 1 &&
            member.member.id &&
            !isFetching ? (
              <EmptyState
                Icon={EmptyFolder}
                text={`No applications for ${member.member.firstName} ${
                  member.member.lastName
                } found`}
              />
            ) : null}
          </div>
        )}
      </MemberProductApplicationsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(MemberProductApplications);
