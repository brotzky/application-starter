import React from 'react';
import Sidebar from './Sidebar';
import SidebarHeader from './SidebarHeader';
import Dropdown from '../../../ui/components/Dropdown';

export default ({
  defs,
  onNewLanguageSelect,
  onInputValueChange,
  children,
}) => (
  <Sidebar>
    <SidebarHeader>
      <Dropdown
        style={{ width: '100%' }}
        defaultInputValue=""
        placeholder="Add a Language"
        onChange={onNewLanguageSelect}
        onInputValueChange={onInputValueChange}
        items={defs}
        itemToString={i => (i == null ? '' : i.display)}
      />
    </SidebarHeader>
    {children}
  </Sidebar>
);
