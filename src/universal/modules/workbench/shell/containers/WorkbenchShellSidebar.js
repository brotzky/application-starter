import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WorkbenchShellSidebar as SideBarWrapper } from 'gac-utils/sc';
import WorkbenchShellNav from './WorkbenchShellNav';
import WorkbenchShellDepositAccount from '../components/WorkbenchShellDepositAccount';
import WorkbenchShellSidebarProgressPlaceholder from '../components/WorkbenchShellSidebarProgressPlaceholder';
import WorkbenchShellSidebarProgress from '../components/WorkbenchShellSidebarProgress';

/**
 * WorkbenchShellSidebar is the sidebar of the workbench.
 * It contains all the high-level overview content and
 * the navigation.
 */
class WorkbenchShellSidebar extends Component {
  renderWorkbenchShellApplication() {
    const { workbench, workbenchConfig } = this.props;
    const links = workbenchConfig.config.navigation;

    return (
      !workbench.errors.includes('NO_PERMISSION') && (
        <div>
          {links.depositAccountDetails && (
            <WorkbenchShellDepositAccount workbench={workbench} />
          )}
          <WorkbenchShellSidebarProgress />
        </div>
      )
    );
  }

  render() {
    const {
      params,
      user,
      workbench: { isFetching },
      workbenchConfig: { isLoaded, config },
    } = this.props;

    const isLoading = isFetching || user.isFetching || !isLoaded;

    return (
      <SideBarWrapper>
        <WorkbenchShellNav params={params} />
        {isLoading &&
          isLoaded && (
            <WorkbenchShellSidebarProgressPlaceholder
              length={config.progress.steps.length}
            />
          )}
        {!isLoading && this.renderWorkbenchShellApplication()}
      </SideBarWrapper>
    );
  }
}

const mapStateToProps = state => ({
  checklist: state.checklist,
  user: state.user,
  workbench: state.workbench,
  workbenchConfig: state.configs.workbench,
  org: state.auth.organization,
});

export default connect(mapStateToProps)(WorkbenchShellSidebar);
