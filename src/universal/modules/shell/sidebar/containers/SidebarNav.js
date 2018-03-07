import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import { Applications } from '../../../ui/icons/';

class SidebarNav extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="SidebarNav">
        <ul className="SidebarNav__list">
          <li className="SidebarNav__item">
            <Link
              to="/applications"
              data-tooltip="Applications"
              className={`SidebarNav__link ${addClassNameIf(
                location.pathname === '/' ||
                  location.pathname.includes('application'),
                'SidebarNav__link--active',
              )}`}
              activeClassName="SidebarNav__link--active"
            >
              <Applications className="SidebarNav__icon" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SidebarNav;
