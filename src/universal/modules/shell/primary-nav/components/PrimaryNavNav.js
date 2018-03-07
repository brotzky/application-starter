import React from 'react';
import { Link } from 'react-router-dom';
import { ApplicationsSmall, AppSmall } from '../../../ui/icons/';
import { Flag, ViewPermission } from '../../../ui/components';

const PrimaryNavNav = () => (
  <nav className="PrimaryNavNav">
    <ul className="PrimaryNavNav__list">
      <li className="PrimaryNavNav__item">
        <Link
          to="/applications"
          className="PrimaryNavNav__link"
          activeClassName="PrimaryNavNav__link--active"
        >
          <ApplicationsSmall className="PrimaryNavNav__icon" />Applications
        </Link>
      </li>
      {/* <ViewPermission permission="EDIT_TRANSLATIONS">
        <Flag name="translator">
          <li className="PrimaryNavNav__item">
            <Link
              to="/tools/translator/dev"
              className="PrimaryNavNav__link"
              activeClassName="PrimaryNavNav__link--active"
            >
              <AppSmall className="PrimaryNavNav__icon" />Translations
            </Link>
          </li>
        </Flag>
      </ViewPermission> */}
    </ul>
  </nav>
);

export default PrimaryNavNav;
