import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FadeIn } from '../../../ui/transitions/';
import { ProductsIcon, RolesIcon, UsersIcon } from '../../../ui/icons';

const StyledFadeIn = styled(FadeIn)`
  padding: 1rem 3.5rem;
`;

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

const NavListLink = styled(NavLink)`
  display: flex;
  border: 1px solid transparent;
  left: -1.28571rem;
  min-width: 200px;
  padding: 0.9rem 3rem 0.9rem 2rem;
  font-weight: 400;
  color: #262626;
  position: relative;
  border-radius: 2px;
  margin-bottom: 2px;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  svg {
    margin: 0 20px 1px 0;
    height: 22px;
    width: 22px;

    * {
      fill: #888;
    }
  }

  ${props =>
    props.active
      ? `
    color: #262626;
    background: #fff;
    border: 1px solid #e8e8e8;
    `
      : ''};
`;

/**
 * AccountShellSidebar is the sidbar navigation for the account section.
 */
class AccountShellSidebar extends Component {
  buildNav(link) {
    const isActive = this.props.pathname === `/account${link.path}`;

    return (
      <li key={link.text}>
        <NavListLink active={isActive} to={`/account${link.path}`}>
          {link.icon()} {link.text}
        </NavListLink>
      </li>
    );
  }

  render() {
    return (
      <StyledFadeIn component="div">
        <NavList>{sidebarLinks.map(link => this.buildNav(link))}</NavList>
      </StyledFadeIn>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(AccountShellSidebar);
