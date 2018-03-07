import React from 'react';

const SidebarUserMenu = props =>
  <div className="SidebarUserMenu">
    <ul className="SidebarUserMenu__list">
      <li className="SidebarUserMenu__item" onClick={props.authLogout}>
        <span className="SidebarUserMenu__link">Logout</span>
      </li>
    </ul>
  </div>;

export default SidebarUserMenu;
