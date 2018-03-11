import React from 'react';
import Sidebar from './Sidebar';
import SidebarHeader from './SidebarHeader';
import SidebarCategory from './SidebarCategory';
import SidebarButton from './SidebarButton';
import CreateCategory from './CreateCategory';
import ViewPermission from '../../../ui/components/Permissions/ViewPermission';

const categories = (keys, onSidebarCategoryClick) =>
  keys.map(key => (
    <SidebarCategory key={key} onClick={() => onSidebarCategoryClick(key)}>
      {key}
    </SidebarCategory>
  ));

export default ({
  defs,
  onBackClick,
  onSidebarCategoryClick,
  onCategoryAdd,
}) => (
  <Sidebar>
    <SidebarHeader>
      <SidebarButton onClick={onBackClick}>Back</SidebarButton>
    </SidebarHeader>
    <ViewPermission permission="EDIT_TRANSLATIONS">
      <CreateCategory onCategoryAdd={onCategoryAdd} />
      {categories(Object.keys(defs), onSidebarCategoryClick)}
    </ViewPermission>
  </Sidebar>
);
