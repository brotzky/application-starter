// @flow
import { getGroupedChecklists } from './group-checklists';

export const featureSelector = (state: {}, featureName: string) =>
  state.configs.app &&
  state.configs.app.config &&
  state.configs.app.config.features &&
  state.configs.app.config.features[featureName];

export const permissionSelector = (state: {}, permission: string) =>
  state.permissions &&
  state.permissions.permissions &&
  state.permissions.permissions[permission];

/**
 * activeChecklistsSelector()
 * 
 * Mainly used to display the badges and proper filter items within
 * the GAC workbench. This is kept explicit with switch statements and individual
 * filter definitions to keep readability high.
 */
export const activeChecklistsSelector = (state: {}) => {
  const {
    checklist: { filter: { primary, secondary }, checklists },
    users: { roles },
  } = state;

  /**
   * Formatting the roles with proper { [permission]: true } object
   * instead of an array of strings
   */
  const allRoles = roles.map(role => {
    const permissions = {};

    for (const key of role.permissions) {
      permissions[key] = true;
    }

    return {
      name: role.name,
      permissions,
    };
  });

  const selectedRole = allRoles.find(role => role.name === primary);

  // First, filter by the Primary filter
  const primaryFilterChecklists =
    primary !== 'ALL'
      ? checklists.filter(
          checklist => selectedRole.permissions[checklist.permissions.edit],
        )
      : checklists;

  // Second, apply a secondary filter once the primary filter has been done
  const resolved = primaryFilterChecklists.filter(
    checklist => checklist.verified === 'VERIFIED',
  );

  const unresolved = primaryFilterChecklists.filter(
    checklist => checklist.verified !== 'VERIFIED',
  );

  const automationRun = primaryFilterChecklists.filter(
    checklist => checklist.phase === 'AUTOMATION_RUN',
  );

  const passedAutomation = primaryFilterChecklists.filter(
    checklist =>
      checklist.result === 'PASSED' && checklist.phase === 'AUTOMATION_RUN',
  );

  const failedAutomation = primaryFilterChecklists.filter(
    checklist =>
      checklist.verified === 'NOT_VERIFIED' &&
      checklist.phase === 'AUTOMATION_RUN',
  );

  // And finally, return the flatList and groupedList of data
  switch (secondary) {
    case 'ALL':
      return {
        flatList: primaryFilterChecklists,
        groupedList: getGroupedChecklists(primaryFilterChecklists),
      };
    case 'RESOLVED':
      return {
        flatList: resolved,
        groupedList: getGroupedChecklists(resolved),
      };
    case 'UNRESOLVED':
      return {
        flatList: unresolved,
        groupedList: getGroupedChecklists(unresolved),
      };
    case 'AUTOMATION_RUN':
      return {
        flatList: automationRun,
        groupedList: getGroupedChecklists(automationRun),
      };
    case 'PASSED_AUTOMATION':
      return {
        flatList: passedAutomation,
        groupedList: getGroupedChecklists(passedAutomation),
      };
    case 'FAILED_AUTOMATION':
      return {
        flatList: failedAutomation,
        groupedList: getGroupedChecklists(failedAutomation),
      };
    default:
      return {
        flatList: checklists,
        groupedList: getGroupedChecklists(checklists),
      };
  }
};
