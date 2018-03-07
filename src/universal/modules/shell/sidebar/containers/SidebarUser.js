import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { authLogout } from 'grow-actions/auth/auth-logout';
import SidebarUserMenu from '../components/SidebarUserMenu';
import { User } from '../../../ui/icons/';

class SidebarUser extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick = async () => {
    await dispatch(authLogout());
    await dispatch(push('/login'));
  };

  render() {
    return (
      <div className="SidebarUser">
        <ul className="SidebarNav__list">
          <li className="SidebarNav__item SidebarUser__item">
            <span className="SidebarUser__link SidebarNav__link">
              <User className="SidebarNav__icon SidebarUser__link-icon" />
            </span>
            <SidebarUserMenu authLogout={this.handleLogoutClick} />
          </li>
        </ul>
      </div>
    );
  }
}

export default SidebarUser;
