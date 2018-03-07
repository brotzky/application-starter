import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  min-height: 768px;
  width: 25%;
  background-color: #2d2d2d;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

export default ({ children }) => (
  <Sidebar>
    <SidebarList>{children}</SidebarList>
  </Sidebar>
);
