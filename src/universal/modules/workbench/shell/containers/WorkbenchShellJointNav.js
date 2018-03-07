import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { productApplication } from 'grow-utils/productApplicationUtils';

const WorkbenchShellJointNav = props => {
  const { params, workbench, org } = props;
  const Application = productApplication(org, workbench);
  const joint = Application.getJointDetails();

  return (
    <div
      className={`WorkbenchShellJointNav ${
        joint.isJoint ? 'WorkbenchShellJointNav--joint' : ''
      }`}
    >
      {joint.isJoint ? (
        <div className="WorkbenchShellJointNavContainer">
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
              <Link
                key={link}
                className={`WorkbenchShellJointNavTab ${
                  currentUser ? 'WorkbenchShellJointNavTab--active' : ''
                }`}
                to={link}
              >
                <span
                  className={`WorkbenchShellJointNavTab__icon${
                    index ? '--secondary' : ''
                  }`}
                >
                  {initials}
                </span>
                {fullName}
              </Link>
            ) : (
              <div
                key={link}
                className={`
                        WorkbenchShellJointNavTab
                        ${
                          applicant.accepted
                            ? ''
                            : 'WorkbenchShellJointNavTab--pending'
                        }
                        ${
                          currentUser ? 'WorkbenchShellJointNavTab--active' : ''
                        }
                      `}
              >
                <span className="WorkbenchShellJointNavTab__icon">
                  {initials}
                </span>
                {fullName}
                {!applicant.accepted && (
                  <span style={{ marginLeft: '8px', opacity: '0.5' }}>
                    (pending)
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  user: state.user,
  org: state.auth.organization,
});

export default connect(mapStateToProps)(WorkbenchShellJointNav);
