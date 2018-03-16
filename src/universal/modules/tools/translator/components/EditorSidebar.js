import React from 'react';
import Sidebar from './Sidebar';
import SidebarHeader from './SidebarHeader';
import SidebarCategory from './SidebarCategory';
import SidebarButton from './SidebarButton';
import CreateCategory from './CreateCategory';
import { GrowEmployee } from '../../../ui/components';
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
    <GrowEmployee>
      <CreateCategory onCategoryAdd={onCategoryAdd} />
    </GrowEmployee>
    <ViewPermission permission="EDIT_TRANSLATIONS">
      {categories(Object.keys(defs), onSidebarCategoryClick)}
    </ViewPermission>
  </Sidebar>
);
