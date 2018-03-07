import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../../ui/components';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { getPermission } from 'grow-utils/permissionCheck';
import {
  dispatchPropType,
  workbenchPropType,
  userPropType,
  permissionsPropType,
  statePropType,
} from 'gac-utils/proptypes';

class StatusActiveButton extends Component {
  constructor(props) {
    super(props);
    const { workbench, user, permissions } = this.props;
    const permissionObj = getPermission(workbench.state, 'ACTIVE', permissions);
    const canEdit =
      workbench.primaryRep.email === user.email && permissionObj.hasPermission;
    this.state = { canEdit, PERM_ENUM: permissionObj.permission };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.workbench.primaryRep.email !==
        this.props.workbench.primaryRep.email ||
      nextProps.state !== this.props.state
    ) {
      const permissionObj = getPermission(
        nextProps.workbench.state,
        'ACTIVE',
        nextProps.permissions,
      );
      const canEdit =
        nextProps.workbench.primaryRep.email === nextProps.user.email &&
        permissionObj.hasPermission;
      this.setState({
        canEdit,
      });
    }
  }

  handleActiveClick = () => {
    const { dispatch, workbench } = this.props;
    // make sure no hacks around it
    if (this.state.canEdit) {
      return dispatch(
        showModal('STATUS_MODAL', {
          dispatch,
          workbench,
          changeToStatus: 'active',
        }),
      );
    }
  };

  render() {
    const appearance = this.props.isFromAppStatusPage ? 'secondary' : 'primary';

    return (
      <Button
        onClick={this.handleActiveClick}
        permission={this.state.PERM_ENUM}
        disabled={!this.state.canEdit}
        text="Active"
        appearance={appearance}
        size="large"
        id="ActivateLoan"
      />
    );
  }
}

StatusActiveButton.defaultProps = {
  isFromAppStatusPage: false,
};

StatusActiveButton.propTypes = {
  dispatch: dispatchPropType.isRequired,
  user: userPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  permissions: permissionsPropType.isRequired,
  isFromAppStatusPage: PropTypes.bool,
  state: statePropType.isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  user: state.user,
  permissions: state.permissions.permissions,
  state: state.workbench.state,
});

export default connect(mapStateToProps)(StatusActiveButton);
