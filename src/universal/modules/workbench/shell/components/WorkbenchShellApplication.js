import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../../ui/transitions/';
import { productApplication } from 'grow-utils/productApplicationUtils';

const StatusContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;
const StatusRating = styled.div`
  padding: 0.5rem 0;
`;

const Edit = styled(Link)`
  padding: 0.5rem 1rem;
  &:hover {
    background: white;
  }
`;

const buildStatusNav = baseUrl => <Edit to={`${baseUrl}/status`}>Edit</Edit>;

const WorkbenchShellApplication = ({ workbench, org, params }) => {
  const Application = productApplication(org, workbench);
  const baseUrl = `/members/${params.memberId}/workbench/${
    params.workbenchId
  }/${params.workbenchProduct}`;

  const renderCurrentState = () => {
    switch (workbench.state) {
      case 'declined':
        return (
          <div className="WorkbenchShellHeader__heading-status--declined">
            Declined
          </div>
        );
      case 'on-hold':
        return (
          <div className="WorkbenchShellHeader__heading-status--onhold">
            On Hold
          </div>
        );
      case 'fraud':
        return (
          <div className="WorkbenchShellHeader__heading-status--declined">
            Fraud
          </div>
        );
      case 'complete':
        return (
          <div className="WorkbenchShellHeader__heading-status--completed">
            Complete
          </div>
        );
      default:
        break;
    }
  };

  return (
    <FadeIn className="WorkbenchShellSection" component="section">
      <div className="WorkbenchShellApplication">
        <h6 className="WorkbenchShellHeader__heading">
          <div>Application</div>
          {renderCurrentState()}
        </h6>
        <ul className="WorkbenchShellList">
          <li className="WorkbenchShellList__item">
            <span className="WorkbenchShellList__title">ID</span>
            <span className="WorkbenchShellList__detail">
              {workbench.applicationNumber}
            </span>
          </li>
          <li className="WorkbenchShellList__item">
            <span className="WorkbenchShellList__title">Created</span>
            <span className="WorkbenchShellList__detail">
              {moment(workbench.dateCreated).format('MMM D YYYY, h:mm a')}
            </span>
          </li>
          <li className="WorkbenchShellList__item">
            <span className="WorkbenchShellList__title">Type</span>
            <span className="WorkbenchShellList__detail">
              {Application.getJointDetails().isJoint ? 'Joint' : 'Single'}
            </span>
          </li>
          <li className="WorkbenchShellList__item">
            <div className="WorkbenchShellList__title">Status</div>
            <StatusContainer>
              <StatusRating>
                {workbench.state === 'declined'
                  ? 'Declined'
                  : workbench.state === 'on-hold'
                    ? 'On Hold'
                    : workbench.state === 'fraud'
                      ? 'Fraud'
                      : Application.getMaskedStatus(workbench.currentStep)}
              </StatusRating>
              {buildStatusNav(baseUrl)}
            </StatusContainer>
          </li>
          <li className="WorkbenchShellList__item">
            <span className="WorkbenchShellList__title">Applicant</span>
            <span className="WorkbenchShellList__detail">
              {workbench.creator.firstName} {workbench.creator.lastName}
            </span>
          </li>
          <li
            className="WorkbenchShellList__item"
            title={workbench.creator.email}
          >
            <span className="WorkbenchShellList__title">Email</span>
            <span className="WorkbenchShellList__detail">
              {workbench.creator.email}
            </span>
          </li>
          {workbench.invites.map(invite => {
            const hasAccepted = workbench.otherUsers.some(
              user => user.email === invite.email,
            );
            return (
              <li key={invite.email} className="WorkbenchShellList__item">
                <span className="WorkbenchShellList__title">Invite</span>
                <span
                  className={`WorkbenchShellList__detail ${
                    hasAccepted ? '' : 'WorkbenchShellList__detail--pending'
                  }`}
                >
                  {invite.firstName} {invite.lastName}
                </span>
              </li>
            );
          })}
          <li className="WorkbenchShellList__item">
            <span className="WorkbenchShellList__title">Manager</span>
            <FadeIn>
              <span>
                {workbench.primaryRep.firstName} {workbench.primaryRep.lastName}
              </span>
            </FadeIn>
          </li>
        </ul>
      </div>
    </FadeIn>
  );
};

export default WorkbenchShellApplication;
