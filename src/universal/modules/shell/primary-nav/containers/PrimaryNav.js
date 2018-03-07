import React from 'react';
import TopbarSearch from '../../topbar/containers/TopbarSearch';
import PrimaryNavNav from '../components/PrimaryNavNav';
import PrimaryNavDropdown from '../components/PrimaryNavDropdown';
import { GrowWhite } from '../../../ui/logo/logos';

const PrimaryNav = () => (
  <div className="PrimaryNav">
    <div className="PrimaryNav__left">
      <GrowWhite className="PrimaryNav__logo" />
      <PrimaryNavNav />
      <TopbarSearch />
    </div>
    <div className="PrimaryNav__middle" />
    <div className="PrimaryNav__right">
      <PrimaryNavDropdown />
    </div>
  </div>
);

export default PrimaryNav;
