import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getWorkbench } from 'grow-actions/workbench/workbench';
import { RESET_WORKBENCH } from 'grow-actions/workbench/constants';
import { getChecklist } from 'grow-actions/checklist/checklist';
import { getMemberProductApplicationMetadata } from 'grow-actions/member/member-category-metadata';
import { workbenchShell, container } from 'gac-utils/sc';
import { GET_WORKBENCH_CONFIG_SUCCESS } from '../../../../configs/constants';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import WorkbenchShellSidebar from './WorkbenchShellSidebar';
import WorkbenchShellDynamic from '../components/WorkbenchShellDynamic';
import MemberNoteComposer from '../../../member/containers/MemberNoteComposer';
import { FadeInFast } from '../../../ui/transitions/';
import {
  paramsPropType,
  workbenchPropType,
  dispatchPropType,
  userPropType,
  memberPropType,
  orgPropType,
} from 'gac-utils/proptypes';
import { permissionSelector } from 'gac-utils/selectors';

const WorkbenchShellContainer = styled(FadeInFast)`
  ${workbenchShell};
`;
/**
 * WorkbenchShell - The highest level component for the Workbench view.
 * Contained within here is the Sidebar, Nav, and Dynamic content.
 */
class WorkbenchShell extends Component {
  state = {
    asyncConfig: {},
  };

  componentDidMount() {
    const { match: { params }, workbench } = this.props;

    this.importConfig();

    if (!workbench.id || workbench.id !== params.workbenchId) {
      this.getWorkbenchData(params);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.workbenchId !== this.props.match.params.workbenchId
    ) {
      return this.getWorkbenchData(this.props.match.params);
    }

    return null;
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET_WORKBENCH });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: RESET_WORKBENCH });
  }

  getWorkbenchData(nextParams) {
    const { dispatch, hasPermissionToViewChecklists } = this.props;

    dispatch(getWorkbench(nextParams.workbenchId));

    if (hasPermissionToViewChecklists) {
      dispatch(getChecklist(nextParams.workbenchId));
    }

    dispatch(
      getMemberProductApplicationMetadata(
        nextParams.memberId,
        nextParams.workbenchId,
      ),
    );
  }

  handleSuccessfulImport = response => {
    if (response.default) {
      this.props.dispatch({
        type: GET_WORKBENCH_CONFIG_SUCCESS,
        payload: response.default,
      });
    }
  };

  handleFailedImport = err => {
    const {
      organization,
      match: { params: { workbenchProduct } },
    } = this.props;

    console.error(
      `${err}: There is no config defined for ${organization} with the product name ${workbenchProduct}. Falling back to the default config`,
    );

    import('../../../../configs/default/workbench.config.js')
      .then(this.handleSuccessfulImport)
      .catch(error => {
        throw new Error(
          `${error}: There is no default config defined for ${organization} with the product name ${workbenchProduct}.`,
        );
      });
  };

  importConfig() {
    const {
      organization,
      match: { params: { workbenchProduct } },
    } = this.props;

    import(`../../../../configs/organizations/${organization.toLowerCase()}/workbench/${workbenchProduct}.config.js`)
      .then(this.handleSuccessfulImport)
      .catch(this.handleFailedImport);
  }

  render() {
    const { dispatch, member, match: { params }, user, workbench } = this.props;
    const isUserClaimer = workbench.primaryRep.email === user.email;

    /**
     * <WorkbenchShellSidebar /> is the dedicated information that stays fixed
     * <WorkbenchShellDynamic /> handles the dynamic tab rendering
     */
    return (
      <WorkbenchShellContainer component="div">
        <WorkbenchShellSidebar params={params} />
        <WorkbenchShellDynamic
          workbench={workbench}
          params={params}
          isUserClaimer={isUserClaimer}
        />
        <MemberNoteComposer
          dispatch={dispatch}
          member={member}
          params={params}
        />
      </WorkbenchShellContainer>
    );
  }
}

WorkbenchShell.propTypes = {
  dispatch: dispatchPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  user: userPropType.isRequired,
  member: memberPropType.isRequired,
  organization: orgPropType.isRequired,
  hasPermissionToViewChecklists: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  member: state.member,
  user: state.user,
  roles: state.users.roles,
  workbench: state.workbench,
  // tailor made for 1st choice until we have a better solution
  organization:
    state.auth.organization === '_1STCHOICE'
      ? '1stchoice'
      : state.auth.organization,
  hasPermissionToViewChecklists:
    permissionSelector(state, 'VIEW_VERIFICATION_CHECKLIST_OVERVIEWS') || false,
});

export default AuthWrapper(connect(mapStateToProps)(WorkbenchShell));
