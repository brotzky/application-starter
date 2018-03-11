// @flow
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AccountSettingsAutoDeclined from '../components/AccountSettingsAutoDeclined';
import { FadeIn } from '../../../ui/transitions/';
import AdminStep from './admin-step/AdminStep';
import ApplicationStatusApproval from './personal-loan/ApplicationStatusApproval';
import ApplicationStatusFund from './personal-loan/ApplicationStatusFund';
import LegalDocuments from './personal-loan/legal-documents/containers/LegalDocuments';

const ApplicationStatusStepContainer = styled.div`
  position: relative;

  &:not(:last-child)::before {
    content: '';
    width: 2px;
    height: 100%;
    background: ${props => props.theme.colors.greyBg};
    position: absolute;
    z-index: 0;
    top: 0;
    left: 2.8rem;
  }
`;

const ApplicationStatusStep = styled.div`
  position: relative;
  top: -3.6rem;
  padding: 0 4rem 4rem 10rem;
`;

const ApplicationStatusCircle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  background: ${props => props.theme.colors.greyBg};
  border-radius: 50%;
  height: 56px;
  width: 56px;
  color: #838588;
`;

const ApplicationStatusHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.6rem;
`;

const ApplicationStatusSubheader = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  width: 90%;
`;
const ApplicationStatusListHeader = styled.h6`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  width: 90%;
`;
const ApplicationStatusListItem = styled.li`
  list-style-position: inside;
  font-size: 1.5rem;
  padding: 0.5rem;
  width: 90%;

  &:last-child {
    margin-bottom: 3rem;
  }
`;

const AccountSettings = styled(FadeIn)`
  background: white;
  padding: 3rem;
`;

const ApplicationStatus = (props: {
  workbench: { configIsLoaded: boolean, config: {}, errors: {} },
  params: { workbenchTab: string },
}) => {
  const {
    params,
    autoDeclinedReasons,
    complianceDeclineReasons,
    workbenchConfig,
  } = props;

  const shouldRenderApplicationStatusSteps =
    workbenchConfig.config[params.workbenchTab] &&
    workbenchConfig.config[params.workbenchTab].groups;

  return (
    <AccountSettings component="div">
      {(autoDeclinedReasons.length || complianceDeclineReasons.length) && (
        <AccountSettingsAutoDeclined />
      )}
      {workbenchConfig.isLoaded && (
        <div>
          {shouldRenderApplicationStatusSteps &&
            workbenchConfig.config[params.workbenchTab].groups.map(
              (group, index) => (
                <ApplicationStatusStepContainer key={group.header}>
                  <ApplicationStatusCircle>{index + 1}</ApplicationStatusCircle>
                  <ApplicationStatusStep>
                    <ApplicationStatusHeader>
                      {group.header}
                    </ApplicationStatusHeader>
                    <ApplicationStatusSubheader
                      dangerouslySetInnerHTML={{ __html: group.subheader }}
                    />
                    {group.list && [
                      <ApplicationStatusListHeader key={group.list.header}>
                        {group.list.header}
                      </ApplicationStatusListHeader>,
                      <ul key={`${group.list.header}-ul`}>
                        {group.list.items.map(list => (
                          <ApplicationStatusListItem key={list}>
                            {list}
                          </ApplicationStatusListItem>
                        ))}
                      </ul>,
                    ]}
                    {(() => {
                      switch (group.type) {
                        case 'ADMIN_STEPS':
                          return <AdminStep steps={group.steps} />;
                        case 'LOAN_APPROVAL':
                          return <ApplicationStatusApproval />;
                        case 'LOAN_AGREEMENT':
                          return <LegalDocuments />;
                        case 'LOAN_FUND':
                          return <ApplicationStatusFund />;
                        case 'EXTERNAL_CHECKLIST':
                          return null;
                        default:
                          return (
                            <span role="img" aria-label="emoji">
                              ⚠️ No matching group types in setup configuration
                            </span>
                          );
                      }
                    })()}
                  </ApplicationStatusStep>
                </ApplicationStatusStepContainer>
              ),
            )}
        </div>
      )}
    </AccountSettings>
  );
};

ApplicationStatus.propTypes = {
  autoDeclinedReasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  complianceDeclineReasons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  workbenchConfig: state.configs.workbench,
  autoDeclinedReasons: state.workbench.autoDeclineReasons || [],
  complianceDeclineReasons:
    state.workbench.quote.complianceDeclineReasons || [],
});

export default connect(mapStateToProps)(ApplicationStatus);
