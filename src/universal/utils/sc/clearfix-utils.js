import { css } from 'styled-components';

export const clearfix = css`
  &:before,
  &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
`;
