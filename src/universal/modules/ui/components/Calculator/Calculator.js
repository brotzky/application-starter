import styled from 'styled-components';
import { media } from 'gac-utils/sc';

export const CalculatorColumnOne = styled.div`
  width: 237px;

  ${media.xlarge`width: 228px;`} ${media.largest`width: 296px;`};
`;
export const CalculatorColumnTwo = styled.div`
  width: 122px;

  ${media.xlarge`width: 117px;`} ${media.largest`width: 129px;`};
`;
export const CalculatorColumnThree = styled.div`
  display: flex;
  align-items: flex-end;
`;
