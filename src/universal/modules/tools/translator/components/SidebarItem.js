import React from 'react';
import styled from 'styled-components';

const SidebarItem = styled.li`
  min-height: 34px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 2rem;
  box-sizing: border-box;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background ease-in-out 0.3s;
  &:hover {
    transition: background ease-in-out 0.3s;
    background-color: #383737;
    border-radius: 2px;
    color: #fff;
  }
  color: ${props => (props.selected ? '#448aff' : '#656565')};
  background: ${props =>
    props.selected ? 'rgba(255, 255, 255, 0.8)' : 'none'};
  font-weight: ${props => (props.selected ? '600' : '400')};
`;

export default ({ children, onClick, selected, style }) => (
  <SidebarItem onClick={onClick} selected={selected} style={style}>
    {children}
  </SidebarItem>
);
