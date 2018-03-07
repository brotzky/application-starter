// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { permissionSelector } from 'gac-utils/selectors';
import { EmptyState } from '../../components/';

/**
 * <ViewPermission />
 * A compenent used to wrap components that require
 * permissions to view 
 */

// Used for the view permissions Icon
const EyeBall = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 48 48"
    width="48"
    height="48"
  >
    <g className="nc-icon-wrapper" fill="#585858">
      <path
        fill="none"
        stroke="#585858"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        d="M4,26c0,0,7.9-12,20-12 c12,0,20,12,20,12s-8.1,12-20,12C12,38,4,26,4,26z"
        strokeLinejoin="miter"
      />{' '}
      <circle
        data-color="color-2"
        fill="none"
        stroke="#585858"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="24"
        cy="22"
        r="8"
        strokeLinejoin="miter"
      />{' '}
      <line
        data-color="color-2"
        fill="none"
        stroke="#585858"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="6"
        y1="40"
        x2="38"
        y2="8"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);
const ViewPermission = (props: {
  children: React.Node,
  hasPermission: boolean,
  text?: string,
}) => {
  const {
    children,
    emptyStateText,
    hasPermission,
    text,
    gacPermissions,
    permission,
    hide,
  } = props;
  const requiredPermission = gacPermissions.find(
    gacPerm => gacPerm.name === permission,
  );

  if (!requiredPermission && hide) return null;
  if (!requiredPermission) return children;

  return (
    <div>
      {hasPermission ? (
        children
      ) : (
        <EmptyState Icon={EyeBall} text={emptyStateText} />
      )}
    </div>
  );
};

ViewPermission.defaultProps = {
  text: '',
};

ViewPermission.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  text: PropTypes.string,
  hasPermission: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  hasPermission: permissionSelector(state, ownProps.permission),
  gacPermissions: state.users.permissions,
});

export default connect(mapStateToProps)(ViewPermission);
