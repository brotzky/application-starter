import React from 'react';
import styled, { css, keyframes } from 'styled-components';

/**
 * An inline tooltip for rendering text faster than using title.
 */
const InlineTooltip = styled.span`
  visibility: hidden;
  line-height: normal;
  min-width: 150px;

  border-radius: 4px;
  padding: 1.2rem;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 4px 22px rgba(27, 39, 51, 0.14);
  color: ${props => props.theme.colors.black};

  text-align: center;
  bottom: 100%;
  left: 50%;
  font-size: 1.5rem;
  text-transform: none;
  position: absolute;
  z-index: 1;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  transform-origin: bottom;
`;

const InlineTooltipContainer = styled.div`
  ${InlineTooltip} {
    visibility: hidden;
  }
  position: relative;
  &:hover {
    ${InlineTooltip} {
      visibility: ${props => (props.active ? 'visible' : 'hidden')};
    }
  }
`;
InlineTooltip.Container = InlineTooltipContainer;
export default InlineTooltip;
