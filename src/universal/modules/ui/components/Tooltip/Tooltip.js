import React from 'react';
import styled, { keyframes } from 'styled-components';
import WithHover from './WithHover';

const fadeIn = keyframes`
  0% {
    // opacity: 0;
    transform: translateY(6px);
  }

  100% {
    // opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Default top tooltip with bottom arrow.
 */
const Container = styled.div`
  min-width: 320px;
  width: 320px;
  display: block;
  min-height: 90px;
  position: absolute;
  z-index: 2;
  bottom: 100%;
  padding: 1.4rem 1.8rem;
  left: -22%;
  border: 1px solid #cecdcd;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.14);
  z-index: 9999;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  transform-origin: bottom;
  animation: ${fadeIn} 0.2s cubic-bezier(0, 0, 0.2, 1) forwards;

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent #fff #fff;
    transform-origin: 0 0;
    transform: rotate(-45deg);
    box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Tooltip = ({ children, onHover, content, ...rest }) => (
  <WithHover onHover={<Container {...rest}>{children}</Container>}>
    {content}
  </WithHover>
);

export default Tooltip;
