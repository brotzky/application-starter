import React from 'react';
import styled from 'styled-components';
const Action = styled.div`
  position: absolute;
  right: 2.8125rem;
  top: 42px;
  z-index: 2;
  border-radius: 2px;
  padding: 0.5625rem 0;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.08);
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;
const ActionItem = styled.div`
  display: block;
  padding: 7.5px 22.5px 7.5px 15px;
  color: ${props => props.theme.colors.black};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;
Action.Item = ActionItem;
export default Action;
