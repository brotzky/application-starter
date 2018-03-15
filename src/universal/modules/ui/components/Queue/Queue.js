import styled, { keyframes } from 'styled-components';
import { ease } from 'gac-utils/sc';
import { Link } from 'react-router-dom';
import { MenuDots } from 'gac-ui/icons/';

export const QueueItemHeading = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.black};
  margin-top: 0.5rem;
`;

export const QueueHeader = styled.header`
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const QueueItemList = styled.li`
  padding: 0 2.4rem;
  position: relative;
  background: white;
  &:nth-child(even) {
    background: ${props => props.theme.colors.greyLight};
  }
`;

export const QueueItemCell = styled.li`
  display: block;
  flex: 1;
  padding: 1.37rem 1.37rem 1.37rem 0;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.black};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;

  &:last-child {
    padding-right: 0;
  }
`;

export const QueueItemIsRep = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: line-through;
  }
`;

export const QueueItemLink = styled(Link)`
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.blue};
  }
`;
export const QueueItemWrapper = styled.ul`
  min-height: 58px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

export const QueueItem = styled.div`
  padding: 0 ${props => props.theme.space}rem;
  position: relative;
  background: white;

  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

export const QueueItemTitle = styled.div`
  position: relative;
  top: 2px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.2rem;
  opacity: 0.6;
`;

export const QueueSortOptionSelectWrap = styled.span`
  position: relative;
  display: inline-block;
  left: 0.6rem;
`;

export const QueueSortOptionSelect = styled.select`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: column;
  height: 28px;
  border-radius: 4px;
  padding: 0 1.6rem 0 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  ${ease('out')};
  margin: 0 1.6rem 0 0;
  text-transform: none;
  min-width: 163px;
  &:focus,
  &:active {
    outline: none;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const QueueApplications = styled.div`
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

export const QueueItemMenuDotsIcon = styled(MenuDots)`
  * {
    fill: ${props => props.theme.colors.black};
  }
`;

const placeHolderShimmer = keyframes`
  0% {
    background-position: calc(-100vw - 70px) 0;
  }
  
  100% {
    background-position: calc(100vw - 70px) 0;
  }
`;

export const QueuePlaceholder = styled.div`
  min-height: 1326px;
  position: relative;
  background: repeating-linear-gradient(
    to bottom,
    white,
    white 64.69px,
    #f9f8f8 64.69px,
    #f9f8f8 129.38px
  );

  &:before {
    @include cover;
    content: '';
    position: absolute;
    background: linear-gradient(
      to right,
      lighten(#f9f8f8, 1) 4%,
      #f9f8f8 50%,
      lighten(#f9f8f8, 2)
    );
    animation: ${placeHolderShimmer} 2.6s linear infinite;
  }

  &:after {
    @include cover;
    content: '';
    position: absolute;
    z-index: 1;
    background: repeating-linear-gradient(
      to bottom,
      white,
      white 64.69px,
      transparent 64.69px,
      transparent 129.38px
    );
  }
`;

export const QueueList = styled.ul`
  list-style-type: none;
`;

export const QueueActions = styled.div`
  position: absolute;
  right: 37px;
  top: 32px;
  z-index: 2;
  border-radius: 2px;
  padding: ${props => Number(props.theme.space) / 4}rem 0;
  background: white;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.08);
  ${ease('out', '0.2')};
`;

export const QueueActionsItemButton = styled.button`
  display: block;
  padding: 0.8rem 2.4rem 0.8rem 1.6rem;
  color: ${props => props.theme.colors.black};
  text-align: left;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: #f1f1f1;
  }
`;
export const QueueActionsItemLink = styled(Link)`
  display: block;
  padding: 0.8rem 2.4rem 0.8rem 1.6rem;
  color: ${props => props.theme.colors.black};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;
export const QueueActionsItemLinkMain = styled.div`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  margin-bottom: 1px;
`;
export const QueueActionsItemLinkSub = styled.div`
  font-size: 1.25rem;
  opacity: 0.75;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const QueuePaginationButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  background: rgba(black, 0.3);
  box-shadow: 0 2px 6px transparent;
  cursor: pointer;
  ${ease('out')};

  &:hover {
    background: rgba(black, 0.5);
  }

  &:active {
    box-shadow: 0 2px 6px ${props => props.theme.colors.greyLight};
  }

  &:last-child {
    margin-left: 0.8rem;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.35;
  }

  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: white;
  }
`;
