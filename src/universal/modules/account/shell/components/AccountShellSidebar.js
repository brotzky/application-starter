import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FadeIn } from '../../../ui/transitions/';
import { ProductsIcon, RolesIcon, UsersIcon } from '../../../ui/icons';

const sidebarLinks = [
  {
    path: `/overview/`,
    text: 'Products',
    icon: ProductsIcon,
  },
  {
    path: `/users/`,
    text: 'Users',
    icon: UsersIcon,
  },
  {
    path: `/roles/`,
    text: 'Roles',
    icon: RolesIcon,
  },
];

const NavList = styled.ul`
  list-style: none;
`;

const activeClassName = 'WorkbenchShellNav__link--active';

const NavListLink = styled(Link).attrs({
  activeClassName,
})`
  display: flex;
  left: -1.28571rem;
  min-width: 230px;
  padding: 0.9rem 1.28571rem;
  font-weight: 400;
  border: 1px solid transparent;
  color: #262626;
  position: relative;
  border-radius: 2px;
  margin-bottom: 2px;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  &.${activeClassName} {
    color: #262626;
    background: #fff;
    border: 1px solid #e8e8e8;
  }

  svg {
    margin: 0 28px 1px 0;
    height: 22px;
    width: 22px;

    * {
      fill: #888;
    }
  }
`;

/**
 * AccountShellSidebar is the sidbar navigation for the account section.
 */
class AccountShellSidebar extends Component {
  buildNav(link) {
    return (
      <li key={link.text}>
        <NavListLink
          activeClassName={activeClassName}
          to={`/account${link.path}`}
        >
          {link.icon()} {link.text}
        </NavListLink>
      </li>
    );
  }

  render() {
    return (
      <FadeIn component="div">
        <NavList>{sidebarLinks.map(link => this.buildNav(link))}</NavList>
      </FadeIn>
    );
  }
}

export default AccountShellSidebar;
