import React from 'react';
import styled from 'styled-components';

/**
 * <AccountSection />
 * Purpose: To provide consistent card styling. This component
 * only applies the very basics and is not responsible for layout
 */
export default styled.div`
  padding: ${props => (props.padding ? '3.375' : '0')}rem;
  min-height: 504px;
`;
