import styled, { css } from 'styled-components';
import { media } from 'gac-utils/sc';

export const Container = css`
  padding: 2.4rem 4.8rem 9.6rem;
  margin: 0 auto;
  max-width: 1400px;

  ${media.large`
    padding: 3.6rem 3.6rem 9.6rem;
  `};

  ${media.largest`max-width: 1280px;
    padding: 3.6rem 1.2rem 12rem;
  `};
`;

export const workbenchShell = css`
  display: flex;
  align-items: flex-start;
  padding: 3.5rem 8rem;
  max-width: 1270px;
  margin: 0 auto;

  ${media.large`
    padding: 3.5rem 4rem;
  `};

  ${media.largest`
    padding: 3.5rem 3rem;
  `};
`;

export const WorkbenchShellSidebar = styled.div`
  top: 1px;
  width: 280px;

  ${media.xlarge`width: 290px;`};
`;
