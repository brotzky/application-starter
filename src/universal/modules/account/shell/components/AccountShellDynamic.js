import React, { Component } from 'react';
import styled from 'styled-components';
import { capitalizeString } from 'grow-utils/stringFormatting';

const AccountShellDynamicContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;

/**
 * <AccountShellDynamic />
 * A component that deals with rendering dynamically loaded components
 * within the workbench. We are using import() to fetch the selected
 * tab (based on params) and then dynamically return it on render.
 * We are asynchronously loading in components to reduce the filesize of
 * the main workbench.js file.
 */
class AccountShellDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = { asyncChecklist: '', asyncComponent: '' };

    this.asyncLoadComponetTab = this.asyncLoadComponetTab.bind(this);
  }

  // On initial mount, load in the current tab and checklist
  componentDidMount() {
    this.asyncLoadComponetTab(this.props.params);
  }

  /* *
   * When a new tab is clicked on run asyncLoadComponetTab() to
   * asynchronously import the correct component.
   */
  componentWillUpdate(nextProps) {
    const { params } = this.props;
    if (
      nextProps.params.accountTab !== params.accountTab ||
      nextProps.params.accountSecondaryTab !== params.accountSecondaryTab
    ) {
      this.asyncLoadComponetTab(nextProps.params);
    }
  }

  // Checks the param and loads a component dependent on that
  asyncLoadComponetTab(params) {
    // build folderName & fileName based off the workbenchTab paramter
    const fileName = capitalizeString(params.accountTab, '-', '');
    const folderName = params.accountTab;
    const secondaryFileName = `${fileName}${capitalizeString(
      params.accountSecondaryTab,
      '-',
      '',
    )}`;

    let filePath = `${folderName}/containers/${fileName}`;

    if (
      params.accountSecondaryTab &&
      params.accountSecondaryTab.length > 1 &&
      params.accountSecondaryTab.length < 12
    ) {
      filePath = `${folderName}/containers/${secondaryFileName}`;
    }

    /**
     * The profile seciton is a special case where we there's a single file
     * for multiple workbench tabs and the param names don't line up with the
     * file names used
     */

    if (params.accountTab) {
      this.importUtil(filePath, 'asyncComponent');
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
    const { params } = this.props;

    // Creating the dynamic components from state
    const AsyncComponent = this.state.asyncComponent;
    const AsyncChecklist = this.state.asyncChecklist;
    const showDynamicTab = params.accountTab;

    return (
      <AccountShellDynamicContainer>
        {showDynamicTab && AsyncComponent && <AsyncComponent params={params} />}
      </AccountShellDynamicContainer>
    );
  }
}

export default AccountShellDynamic;
