import styled from 'styled-components';
import { media } from 'gac-utils/sc';
export const SecondaryNavListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const SecondaryNavListNested = styled.ul`
  font-size: 1.25rem;
  opacity: 0.75;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    opacity: 1;
    visibility: visible;
    pointer-events: initial;
  }
`;

export const SecondaryNavListNestedProduct = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${props => props.theme.colors.black};
  white-space: nowrap;
`;
export const SecondaryNavListNestedDate = styled.div`
  position: relative;
  top: -1px;
  font-size: ${props => props.theme.font.size1};
`;
export const SecondaryNavWrapper = styled.div`
  background-color: white;
  color: ${props => props.theme.colors.greyMidDark};
  position: relative;
  height: 50px;
  border-bottom: 1px solid #dee4e7;
`;
export const SecondaryNavList = styled.div`
  position: relative;
  display: flex;
  list-style-type: none;
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 16px;

  ${media.large`padding: 0 6px;`};

  ${media.xlarge`
    max-width: initial;
    padding: 0 $base-space;
  `};
`;
