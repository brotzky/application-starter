import styled from 'styled-components';
import { ease, triangle } from 'gac-utils/sc';

export const SidebarWrapper = styled.div`
  position: fixed;
  z-index: 10;
  min-height: 100vh;
  width: 60px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.black};
  box-shadow: 1px 0 4px rgba(black, 0.09);
`;

export const SidebarNav = styled.div`
  position: fixed;
  z-index: 10;
  min-height: 100vh;
  width: 60px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.black};
  box-shadow: 1px 0 4px rgba(black, 0.09);
`;

export const SidebarNavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

export const SidebarNavItem = styled.li`
  margin-bottom: 2.4rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SidebarUser = styled.div`
  width: 100%;
  position: absolute;
  bottom: 3.6rem;
`;

export const SidebarUserMenuLink = styled.span`
  display: block;
  padding: 1.2rem 2.4rem;
  color: white;
  cursor: pointer;
`;

export const SidebarUserMenu = styled.div`
  width: 16.8rem;
  position: absolute;
  top: -5px;
  left: 45px;
  border-radius: 4px;
  background: ${props => props.theme.colors.black};
  box-shadow: 0 2px 8px rgba(black, 0.2);
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  ${ease('out')};

  &:before {
    ${triangle('5px', 'left', `${props => props.theme.colors.black}`)};
    content: '';
    position: absolute;
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
  }
`;
