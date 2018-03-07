import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import WorkbenchShellHeader from '../containers/WorkbenchShellHeader';
import WorkbenchShellJointNav from '../containers/WorkbenchShellJointNav';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { Card, ViewPermission } from '../../../ui/components';

const StyledCard = styled(Card)`
  box-shadow: 0 1px 0 1px rgba(63, 63, 68, 0.05),
    0 2px 3px 0 rgba(63, 63, 68, 0.15);
`;

/**
 * <WorkbenchShellDynamic />
 * A component that deals with rendering dynamically loaded components
 * within the workbench. We are using import() to fetch the selected
 * tab (based on params) and then dynamically return it on render.
 * We are asynchronously loading in components to reduce the filesize of
 * the main workbench.js file.
 */
class WorkbenchShellDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = { asyncChecklist: '', asyncComponent: '' };

    this.asyncLoadComponetTab = this.asyncLoadComponetTab.bind(this);
  }

  // On initial mount, load in the current tab and checklist
  componentDidMount() {
    this.asyncLoadComponetTab(this.props.params);
    this.importUtil(`checklist/containers/Checklist`, 'asyncChecklist');
  }

  /* *
   * When a new tab is clicked on run asyncLoadComponetTab() to
   * asynchronously import the correct component.
   */
  componentWillUpdate(nextProps) {
    const { params } = this.props;
    if (
      nextProps.params.workbenchTab !== params.workbenchTab ||
      nextProps.params.profileSection !== params.profileSection
    ) {
      this.asyncLoadComponetTab(nextProps.params);
    }
  }

  // Checks the param and loads a component dependent on that
  asyncLoadComponetTab(params) {
    // build folderName & fileName based off the workbenchTab paramter
    const fileName = capitalizeString(params.workbenchTab, '-', '');
    const folderName = params.workbenchTab;

    /**
     * The profile seciton is a special case where we there's a single file
     * for multiple workbench tabs and the param names don't line up with the
     * file names used
     */
    if (params.profileSection) {
      this.importUtil(
        `applicant-profile/containers/ApplicantProfile`,
        'asyncComponent',
      );
    } else if (params.workbenchTab) {
      this.importUtil(`${folderName}/containers/${fileName}`, 'asyncComponent');
    }
  }

  importUtil(path, stateKey) {
    // note: including the ../../ path and .js portion of the path here
    import(`../../${path}.js`).then(response => {
      if (response.default) {
        this.setState({ [stateKey]: response.default });
      }
    });
  }

  render() {
    const { isMemberLoaded, workbench, params, org } = this.props;
    const Application = productApplication(org, workbench);

    // Creating the dynamic components from state
    const AsyncComponent = this.state.asyncComponent;
    const AsyncChecklist = this.state.asyncChecklist;
    const showAsyncComponent =
      AsyncComponent &&
      (params.workbenchTab || params.profileSection) &&
      workbench.isLoaded &&
      isMemberLoaded;

    return (
      <div
        className={`WorkbenchShellDynamic ${Application.getJointDetails()
          .isJoint
          ? 'WorkbenchShellDynamic--joint'
          : ''}`}
      >
        <StyledCard>
          <WorkbenchShellJointNav params={params} />
          <WorkbenchShellHeader params={params} />
          <ViewPermission permission="VIEW_APPLICATION">
            <div>
              {AsyncChecklist && <AsyncChecklist params={params} />}
              {showAsyncComponent && <AsyncComponent params={params} />}
            </div>
          </ViewPermission>
        </StyledCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
  isMemberLoaded: state.member.isMemberLoaded,
});

export default connect(mapStateToProps)(WorkbenchShellDynamic);
