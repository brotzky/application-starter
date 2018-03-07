import { capitalizeString } from 'grow-utils/stringFormatting';

const buildPermissionsConfig = permissions => {
  /**
   * Pre-define the categories of the permissions configuration array,
   * this can probably be automated somehow
   */

  const permissionsConfig = [
    {
      name: 'Administrative',
      text:
        'Provide the ability to manage Grow Admin Console user with adminstrative permissions',
      permissions: [],
    },
    {
      name: 'Member',
      text:
        "Restrict access to different pieces of the applicant's submitted information such as their profile, credit bureau, banking profile, and Finsnap data",
      permissions: [],
    },
    {
      name: 'Notes',
      text:
        'Notes can contain sensitive information. Manage which Grow Admin Console users can see which category of notes.',
      permissions: [],
    },
    {
      name: 'Application general',
      text:
        'General application permissions that restrict the ability to access features parts of an application.',
      permissions: [],
    },
    {
      name: 'Application state',
      text: 'Manage roles that can move an applications state.',
      permissions: [],
    },
    {
      name: 'Application checklist',
      text:
        'Only specific roles should be able to resolve checklist items. With application checklist permissions you can restrict which roles can resolve checklist items.',
      permissions: [],
    },
  ];

  /**
   * Map the categories to their corresponding index in the array,
   */
  const categoryToIndex = {
    ADMIN: 0,
    MEMBER: 1,
    NOTES: 2,
    APPLICATIONS: 3,
    APPLICATION_STATE: 4,
    VERIFICATIONS: 5,
  };

  /**
   * Iterate through the permissions (retrieved from the /roles API and passed down from redux state,)
   * and check if an associated VIEW_ONLY/VIEW_&_EDIT permission exists, if it exists then add itself to view/edit,
   * if not push to that category a new permissions object based on the permission type
   */
  permissions.forEach(permission => {
    let permExists = false;
    const permissionName = permission.name;
    const permissionPrettyName = permission.prettyName
      ? capitalizeString(permission.prettyName, ' ', ' ')
      : permission.name;

    const associatedCategory =
      permissionsConfig[categoryToIndex[permission.category]].permissions;

    associatedCategory.forEach(existingPerm => {
      if (existingPerm.view.name) {
        if (
          permissionName === existingPerm.view.name.replace('VIEW_', 'EDIT_')
        ) {
          existingPerm.edit.name = permissionName;
          existingPerm.description = permissionPrettyName;
          permExists = true;
        }
      } else if (existingPerm.edit.name) {
        if (
          permissionName === existingPerm.edit.name.replace('EDIT_', 'VIEW_')
        ) {
          existingPerm.view.name = permissionName;
          existingPerm.description = permissionPrettyName;
          permExists = true;
        }
      }
    });

    if (!permExists) {
      if (permission.type === 'VIEW_ONLY') {
        associatedCategory.push({
          description: permissionPrettyName,
          view: {
            name: permissionName,
          },
          edit: {},
        });
      } else {
        associatedCategory.push({
          description: permissionPrettyName,
          view: {},
          edit: {
            name: permissionName,
          },
        });
      }
    }
  });

  permissionsConfig.forEach(category => {
    category.permissions.sort((a, b) => {
      const descA = a.description.toUpperCase();
      const descB = b.description.toUpperCase();
      if (descA < descB) return -1;
      if (descA > descB) return 1;
      return 0;
    });
  });

  return permissionsConfig;
};

export default buildPermissionsConfig;
