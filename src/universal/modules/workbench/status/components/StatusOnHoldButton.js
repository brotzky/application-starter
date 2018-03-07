import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

class StatusOnHoldButton extends Component {
  constructor(props) {
    super(props);
    const { workbench, user, permissions } = this.props;
    const permissionObj = getPermission(
      workbench.state,
      'ON_HOLD',
      permissions,
    );
    const canEdit =
      workbench.primaryRep.email === user.email && permissionObj.hasPermission;

    this.state = {
      PERM_ENUM: permissionObj.permission,
      hasPermission: permissionObj.hasPermission,
      canEdit,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.workbench.primaryRep.email !==
        this.props.workbench.primaryRep.email ||
      nextProps.state !== this.props.state
    ) {
      const permissionObj = getPermission(
        nextProps.workbench.state,
        'ON_HOLD',
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

  handleOnHoldClick = () => {
    const { dispatch, workbench } = this.props;
    // make sure no hacks around it
    if (this.state.canEdit) {
      return dispatch(
        showModal('STATUS_MODAL', {
          dispatch,
          workbench,
          changeToStatus: 'on hold',
        }),
      );
    }
  };

  canEdit = () =>
    this.props.workbench.primaryRep.email === this.props.user.email &&
    this.state.hasPermission;

  render() {
    const appearance = this.props.isFromAppStatusPage ? 'secondary' : 'primary';

    return (
      <Button
        onClick={this.handleOnHoldClick}
        permission={this.state.PERM_ENUM}
        disabled={!this.state.canEdit}
        text="On Hold"
        appearance={appearance}
        size="large"
        id="OnHoldLoan"
      />
    );
  }
}

StatusOnHoldButton.defaultProps = {
  isFromAppStatusPage: false,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  user: state.user,
  permissions: state.permissions.permissions,
  state: state.workbench.state,
});

StatusOnHoldButton.propTypes = {
  dispatch: dispatchPropType.isRequired,
  user: userPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  permissions: permissionsPropType.isRequired,
  isFromAppStatusPage: PropTypes.bool,
  state: statePropType.isRequired,
};

export default connect(mapStateToProps)(StatusOnHoldButton);
