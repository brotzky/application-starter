import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import styled from 'styled-components';
import { activeChecklistsSelector } from 'gac-utils/selectors';
import { FadeIn } from '../../../ui/transitions';
import ChecklistHeader from '../components/ChecklistHeader';
import ChecklistList from './ChecklistList';
import ChecklistFilter from './ChecklistFilter';

const ChecklistNotFound = styled.div`
  text-align: center;
  padding: 2.5rem;
  color: ${props => props.theme.colors.greyMid};
  border-bottom: 1px solid #ebeef0;
`;

const Checklist = props => {
  const {
    checklist: { checklistDetails, isFetchingDetails, showChecklistDetails },
    groupedChecklists,
    workbench,
    params,
    user,
  } = props;

  const hideFilter =
    window.location.pathname.includes('notes') ||
    window.location.pathname.includes('application-status');

  const showChecklistEmptyState =
    groupedChecklists.length === 0 && props.checklist.checklists.length > 0;

  return (
    <div>
      {!hideFilter && [
        <FadeIn key={1}>
          <ChecklistFilter />
        </FadeIn>,
        <div key={2}>
          {showChecklistEmptyState && (
            <ChecklistNotFound>
              No checklists match your filtered criteria
            </ChecklistNotFound>
          )}
        </div>,
      ]}
      {groupedChecklists
        .filter(checklist => checklist.length)
        .map(checklist => {
          const itemsNotVerified = checklist.filter(
            item => item.verified !== 'VERIFIED',
          );

          const firstChecklistItem = checklist[0] || {};
          const category = firstChecklistItem.category
            .replace(/APPLICANT_PROFILE_/, '')
            .replace(/_/g, '-')
            .toLowerCase();

          const shouldRenderChecklist =
            params.workbenchTab === category ||
            params.profileSection === category ||
            (!params.workbenchTab && !params.profileSection);

          return (
            <Collapse
              key={checklist[0].id}
              isOpened={shouldRenderChecklist}
              springConfig={{ stiffness: 171, damping: 23 }}
            >
              <div className="Checklist">
                <div className="Checklist__box">
                  <ChecklistHeader
                    heading={firstChecklistItem.category}
                    remaining={itemsNotVerified.length}
                  />

                  <ChecklistList
                    checklist={checklist}
                    checklistDetails={checklistDetails}
                    workbench={workbench}
                    isFetchingDetails={isFetchingDetails}
                    params={params}
                    showChecklistDetails={showChecklistDetails}
                    isUserClaimer={workbench.primaryRep.email === user.email}
                  />
                </div>
              </div>
            </Collapse>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => ({
  checklist: state.checklist,
  groupedChecklists: activeChecklistsSelector(state).groupedList,
  workbench: state.workbench,
  user: state.user,
  member: state.member,
});

export default connect(mapStateToProps)(Checklist);
