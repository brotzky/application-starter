import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Generate a pill that can convey different states: success, error, default primary blue.
 */
const Pill = styled.span`
  padding: 2px 10px 3px;
  font-size: 1.2rem;
  border-radius: 30px;
  font-weight: 500;
  ${props => {
    switch (props.state) {
      case 'success':
        return `
          color: #159e70;
          background: rgba(37, 180, 126, 0.14);
        `;
      case 'error':
        return `
          color: ${props.theme.colors.red};
          background: #ffecec;
        `;
      default:
        return `
        color: ${props.theme.colors.blue};       
        background: #d9edf7;
        `;
    }
  }};
`;
export default Pill;
