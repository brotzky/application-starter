import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { productApplication } from 'grow-utils/productApplicationUtils';

const WorkbenchShellJointNavContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
  z-index: -1;

  ${props =>
    props.isJoint &&
    `
    transform: translateY(-57px);
    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `};
`;
const WorkbenchShellJointNavTab = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  padding: 1.6rem 3rem;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  color: ${props => props.theme.colors.greyMid};
  font-weight: 500;
  font-size: 1.4rem;
  min-width: 200px;
  text-align: center;
  position: relative;
  top: 1px;
  width: 50%;
  cursor: ${props => (props.accepted ? ' pointer' : 'not-allowed')};

  ${props =>
    props.active &&
    `
    background: white;
      border-bottom: 1px solid transparent;
      box-shadow: none;
      color: ${props => props.theme.colors.blue};
  `};
`;

const WorkbenchShellJointNavTabIcon = styled.span`
  ${props =>
    props.secondary
      ? `
      background: #cde2f9;
      color: inherit;
      `
      : `
      background: ${props => props.theme.colors.blue};
      color: white;
  `};
`;

const WorkbenchShellJointNav = props => {
  const { params, workbench, org } = props;
  const Application = productApplication(org, workbench);
  const joint = Application.getJointDetails();

  return (
    <WorkbenchShellJointNavContainer isJoint={joint.isJoint}>
      {joint.isJoint ? (
        <div style={{ display: 'flex' }}>
          {joint.applicants.map((applicant, index) => {
            const link = `/members/${applicant.id}/workbench/${
              params.workbenchId
            }/${params.workbenchProduct}`;
            const fullName = `${applicant.firstName} ${applicant.lastName}`;
            const initials =
              applicant.firstName.substring(0, 1).toUpperCase() +
              applicant.lastName.substring(0, 1).toUpperCase();
            const currentUser = applicant.id === params.memberId;

            if (index > 1) return null;

            return applicant.id ? (
              <WorkbenchShellJointNavTab
                key={link}
                active={currentUser}
                to={link}
              >
                <WorkbenchShellJointNavTabIcon secondary={index}>
                  {initials}
                </WorkbenchShellJointNavTabIcon>
                {fullName}
              </WorkbenchShellJointNavTab>
            ) : (
              <WorkbenchShellJointNavTab
                key={link}
                accepted={applicant.accepted}
                active={currentUser}
              >
                <WorkbenchShellJointNavTabIcon>
                  {initials}
                </WorkbenchShellJointNavTabIcon>
                {fullName}
                {!applicant.accepted && (
                  <span style={{ marginLeft: '8px', opacity: '0.5' }}>
                    (pending)
                  </span>
                )}
              </WorkbenchShellJointNavTab>
            );
          })}
        </div>
      ) : null}
    </WorkbenchShellJointNavContainer>
  );
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  user: state.user,
  org: state.auth.organization,
});

export default connect(mapStateToProps)(WorkbenchShellJointNav);
