import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import styled from 'styled-components';
import { activeChecklistsSelector } from 'gac-utils/selectors';
import { FadeIn } from '../../../ui/transitions';
// import ChecklistHeader from '../components/ChecklistHeader';
import ChecklistList from './ChecklistList';
import ChecklistFilter from './ChecklistFilter';
import { mapRouteToConst } from '../../../../utils/checklist-constants';
import { getKeyByValue } from 'grow-utils/objectFormatting';
import { capitalizeString } from 'grow-utils/stringFormatting';

const ChecklistNotFound = styled.div`
  text-align: center;
  padding: 2.5rem;
  color: ${props => props.theme.colors.greyMid};
  border-bottom: 1px solid #ebeef0;
`;

const HeaderHeadingGroup = styled.div`
  display: flex;
  align-items: center;
`;

const SectionHeader = styled.header`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.37rem 3rem;
  border-bottom: 1px solid #ebeef0;
  background: #fafafa;
`;

const SectionHeaderHeading = styled.h5`
  margin: 0;
  font-size: 1.6rem;
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
          // only includes the checklist items related to current page
          const inTheList = currVal => {
            /**
             * when you're at Checklist Overview, we render all checklists,
             * else render only the ENUM defined for each sidebar section
             */
            if (!params.profileSection && !params.workbenchTab) {
              return true;
            }
            return (
              mapRouteToConst[params.profileSection || params.workbenchTab] &&
              mapRouteToConst[
                params.profileSection || params.workbenchTab
              ].includes(currVal.name)
            );
          };

          const shouldRenderChecklist = checklist.every(inTheList);

          const checklistTitle =
            params.profileSection ||
            params.workbenchTab ||
            getKeyByValue(mapRouteToConst, checklist[0].name);

          return (
            <Collapse
              key={checklist[0].id}
              isOpened={shouldRenderChecklist}
              springConfig={{ stiffness: 171, damping: 23 }}
            >
              <div style={{ listStyleType: 'none' }}>
                <div>
                  <SectionHeader>
                    <HeaderHeadingGroup>
                      <SectionHeaderHeading>
                        {capitalizeString(checklistTitle, '-', ' ')} Checklist
                        Item(s)
                      </SectionHeaderHeading>
                    </HeaderHeadingGroup>
                  </SectionHeader>
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
