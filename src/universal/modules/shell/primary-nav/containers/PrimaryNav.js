import React from 'react';
import styled from 'styled-components';
import TopbarSearch from '../../topbar/containers/TopbarSearch';
import PrimaryNavNav from '../components/PrimaryNavNav';
import PrimaryNavDropdown from '../components/PrimaryNavDropdown';
import { GrowWhite } from '../../../ui/logo/logos';

const PrimaryNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #242b3c;
  color: white;
  position: relative;
  height: 56px;
  padding: 0 2.4rem;
`;

const PrimaryNavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const PrimaryNavLogo = styled(GrowWhite)`
  width: 32px;
  height: 30px;
  position: relative;
  top: -1.5px;
`;

const PrimaryNav = () => (
  <PrimaryNavContainer>
    <PrimaryNavLeft>
      <PrimaryNavLogo />
      <PrimaryNavNav />
    </PrimaryNavLeft>
    <TopbarSearch />
    <div />
    <div>
      <PrimaryNavDropdown />
    </div>
  </PrimaryNavContainer>
);

export default PrimaryNav;
