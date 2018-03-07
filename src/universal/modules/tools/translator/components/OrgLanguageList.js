import React from 'react';
import SidebarItem from './SidebarItem';

export default ({ languages, selected, selectLanguage }) =>
  languages.map(lang => (
    <SidebarItem
      key={lang.value}
      onClick={() => selectLanguage(lang.value)}
      selected={selected === lang.value}
    >
      {lang.display}
    </SidebarItem>
  ));
