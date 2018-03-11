import styled from 'styled-components';
import { media } from 'gac-utils/sc';

export default styled.div`
  padding: 2.4rem 4.8rem 9.6rem;
  margin: 0 auto;
  max-width: 1200px;

  ${media.large`
    padding: 3.6rem 3.6rem 9.6rem;
  `};

  ${media.largest`
    max-width: 1280px; 
    padding: 3.6rem 1.2rem 12rem;
  `};
`;
