import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { Button, EmptyState } from '../../ui/components';
import QueueItem from '../../queue/containers/QueueItem';
import QueuePlaceholder from '../../queue/components/QueuePlaceholder';
import JointIcons from '../../ui/joint-icons/';
import { EmptyBox, EmptyFolder } from '../../ui/icons/';
import {
  handleClaimClick,
  handleUnclaimClick,
} from '../../../utils/claim-unclaim';

class MemberProductApplications extends QueueItem {
  render() {
    const { member, products, user, org, dispatch } = this.props;
    const { isFetching, productApplications } = member;

    return (
      <div className="Member__box MemberProductApplications">
        <header className="QueueHeader">
          <ul className="QueueList QueueHeader__list">
            <li className="QueueItem QueueHeader__item">
              <ul className="QueueItem__wrapper QueueHeader__item-wrapper">
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Product</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Manager</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Status</span>
                </li>
                <li className="QueueItem__cell">
                  <span className="QueueItem__heading">Date Created</span>
                </li>
              </ul>
            </li>
          </ul>
        </header>
        {isFetching ? (
          <QueuePlaceholder />
        ) : (
          <div>
            <ul className="QueueList">
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
                  <li key={application.id} className="QueueItem">
                    <ul className="QueueItem__wrapper">
                      <li className="QueueItem__cell">
                        <Link className="QueueItem__link" to={workbenchLink}>
                          <JointIcons application={application} />{' '}
                          {application.prettyName}
                        </Link>
                      </li>
                      <li className="QueueItem__cell">
                        {application.primaryRep.email ? (
                          application.primaryRep.email === user.email ? (
                            <span
                              className="QueueItem__isRep"
                              onClick={() =>
                                handleUnclaimClick(dispatch, Application)
                              }
                            >
                              {application.primaryRep.email}
                            </span>
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
                      </li>
                      <li className="QueueItem__cell">
                        <Link
                          id="queueStep"
                          className="QueueItem__link"
                          to={workbenchLink}
                        >
                          {currentStep}
                        </Link>
                      </li>
                      <li className="QueueItem__cell">
                        {moment(application.dateCreated).format(
                          'MMM D YYYY, h:mm a',
                        )}
                      </li>
                    </ul>
                  </li>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(MemberProductApplications);
