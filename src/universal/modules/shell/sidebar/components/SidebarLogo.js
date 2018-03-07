import React from 'react';
import Logo from '../../../ui/logo/';
import { Link } from 'react-router-dom';

const SidebarLogo = () => (
  <div className="SidebarLogo">
    <Link to="/">
      <Logo className="SidebarLogo__logo" />
    </Link>
  </div>
);

export default SidebarLogo;
