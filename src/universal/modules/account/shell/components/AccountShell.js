import React from 'react';
import { ThemeProvider } from 'styled-components';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import AccountShellWrapper from '../containers/AccountShellWrapper';
import AccountShellSidebar from '../components/AccountShellSidebar';
import AccountShellDynamic from '../components/AccountShellDynamic';
import { FadeInFast } from '../../../ui/transitions/';
import { theme } from '../../../../themes';

const AccountTheme = {
  ...theme,
  fields: {
    flexDirection: 'column',
    marginBottom: '1.5rem',
  },
  labels: {
    color: '#262626',
    fontSize: '1.4rem',
    width: '100%',
    textTransform: 'initial',
  },
  select: {
    border: {
      width: '1px',
      style: 'solid',
    },
    svg: {
      height: '1.2rem',
      top: '4.2rem',
    },
  },
};

/**
 * AccountShell - The highest level component for the Workbench view.
 * Contained within here is the Sidebar, Nav, and Dynamic content.
 */
const AccountShell = props => {
  const { match: { params } } = props;
  /**
   * <AccountShellSidebar /> is the dedicated information that stays fixed
   * <AccountShellDynamic /> handles the dynamic tab rendering
   */
  return (
    <ThemeProvider theme={AccountTheme}>
      <FadeInFast className="WorkbenchShell Container" component="div">
        <AccountShellSidebar />
        <AccountShellDynamic params={params} />
      </FadeInFast>
    </ThemeProvider>
  );
};

export default AuthWrapper(AccountShellWrapper(AccountShell));
