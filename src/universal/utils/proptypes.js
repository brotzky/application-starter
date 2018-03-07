/**
 * Master file containing all common proptype validations
 * Goal is to avoid redeclaring and thinking the shape and type of common props in redux or props from parent component
 * 
 * Please name new variables following the convention of "<propname>PropType". See examples below.
 * 
 * Webpack alias has been set up.
 * Example how you import from a file:
 *   import {
 *     rolesPropType,
 *     isFetchingRolePropType,
 *     permissionsPropType,
 *   } from 'gac-utils/proptypes';
 * 
 * You can add `.isRequired` if the props is required. For example:
 *   Profile.propTypes = {
 *     profile: profilePropType.isRequired,
 *     dispatch: dispatchPropType.isRequired,
 *     params: paramsPropType.isRequired,
 *   };
 */

import PropTypes from 'prop-types';

export const dispatchPropType = PropTypes.func;
export const statePropType = PropTypes.string;

export const workbenchPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.bool,
  PropTypes.object,
  PropTypes.array,
]);

export const userPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
);

export const usersPropType = PropTypes.arrayOf(PropTypes.object);

// assuming you're getting permissions as 'permissions: state.permissions.permissions' from the redux store
export const permissionsPropType = PropTypes.objectOf(PropTypes.bool);

export const memberPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
);

export const rolePropType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
);

export const rolesPropType = PropTypes.arrayOf(PropTypes.object);

export const isFetchingPropType = PropTypes.bool;
export const isFetchingRolePropType = PropTypes.bool;

export const profilePropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
);

export const paramsPropType = PropTypes.objectOf(PropTypes.string);
export const orgPropType = PropTypes.string;
export const isCreateUserFormPropType = PropTypes.bool;
