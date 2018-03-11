import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ApplicationsSmall } from '../../../ui/icons/';

const PrimaryNav = styled.nav`
  margin-left: 2.5rem;
`;

const PrimaryNavList = styled.ul`
  list-style: none;
`;

const PrimaryNavLink = styled(Link)`
  padding: 1.5rem 1.2rem;
  color: #fff;
  font-weight: 500;
`;

const PrimaryNavListIcon = styled(ApplicationsSmall)`
  margin-right: 1.5rem;
  * {
    fill: #fff;
  }
`;

const PrimaryNavNav = () => (
  <PrimaryNav>
    <PrimaryNavList>
      <li>
        <PrimaryNavLink to="/applications">
          <PrimaryNavListIcon />Applications
        </PrimaryNavLink>
      </li>
      {/* <ViewPermission permission="EDIT_TRANSLATIONS">
        <Flag name="translator">
          <LeftNavItem>
            <LeftNavLink to="/tools/translator/dev">
              <LeftNavTranslationIcon />Translations
            </LeftNavLink>
          </LeftNavItem>
        </Flag>
      </ViewPermission> */}
    </PrimaryNavList>
  </PrimaryNav>
);

export default PrimaryNavNav;
