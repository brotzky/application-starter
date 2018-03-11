import React from 'react';
import styled from 'styled-components';

/**
 * <Ellipsis />
 * Purpose: To add overflow ellipsis "..." on text that
 * is cut off by its container.
 */

export default styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
