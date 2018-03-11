import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FadeIn } from '../../../ui/transitions/';
import { activeChecklistsSelector } from 'gac-utils/selectors';
import { mapRouteToConst } from '../../../../utils/checklist-constants';

/**
 * WorkbenchShellNav is the main navigation for the workbench.
 * Fairly static except the Application name "Personal Loan Application"
 * and the baseUrl built off the workbench params.
 */

const FilterBadgeContainer = styled(FadeIn)`
  height: 2rem;
`;

const FilterBadge = styled.span`
  background: #e7f0fb;
  color: rgb(28, 113, 255);
  border-radius: 50%;
  height: 20px;
  width: 20px;
  padding: 1px;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Badge = styled.span`
  display: inline-block;
  position: relative;
  top: -2px;
  padding: 1px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  color: #fff;
  background: #448aff;
  font-weight: 600;
  font-size: 1.2rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0 auto 4.375rem;
`;

const NavListItem = styled.li`
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: -1.28571rem;
  min-width: 260px;
  padding: 0.9rem 1.28571rem;
  font-weight: 400;
  border: 1px solid transparent;
  color: #585858;
  position: relative;
  border-radius: 2px;
  margin-bottom: 2px;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;

const activeStyle = {
  color: '#262626',
  background: '#fff',
  border: '1px solid #e8e8e8',
};

const FilterIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 16 16"
    width="15"
    height="15"
  >
    <g fill="#448aff">
      <path
        fill="#448aff"
        d="M9,15H7c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v0 C10,14.552,9.552,15,9,15z"
      />
      <path
        fill="#448aff"
        d="M11,11H5c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h6c0.552,0,1,0.448,1,1v0C12,10.552,11.552,11,11,11z"
      />
      <path
        fill="#448aff"
        d="M13,7H3C2.448,7,2,6.552,2,6v0c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v0 C14,6.552,13.552,7,13,7z"
      />
    </g>
  </svg>
);

class WorkbenchShellNav extends Component {
  buildNav = (link, baseUrl) => (
    <FadeIn key={link.path}>
      <NavListItem key={link.text}>
        <StyledNavLink
          activeStyle={activeStyle}
          to={`${baseUrl}${link.path}`}
          id={`${link.text.replace(/\s/g, '').toLowerCase()}Section`}
        >
          {link.text}
          <FilterBadgeContainer>
            {this.renderRemainingItems(link.path)}
          </FilterBadgeContainer>
        </StyledNavLink>
      </NavListItem>
    </FadeIn>
  );

  // badge
  renderRemainingItems = path => {
    const prettyPath = path.replace(/(applicant-profile)|(\/)/g, '');
    const { checklists, params } = this.props;

    const remainingItems = checklists.flatList.filter(checklist => {
      if (mapRouteToConst[prettyPath])
        return (
          mapRouteToConst[prettyPath].includes(checklist.name) &&
          checklist.verified !== 'VERIFIED' &&
          checklist.userIds.includes(params.memberId)
        );
    });

    if (remainingItems.length) {
      return <Badge>{remainingItems.length}</Badge>;
    }
    return null;
  };

  render() {
    const { filtersActive, workbenchConfig, params } = this.props;
    const baseUrl = `/members/${params.memberId}/workbench/${
      params.workbenchId
    }/${params.workbenchProduct}/`;

    if (!workbenchConfig.isLoaded) return null;
    const links = workbenchConfig.config.navigation;

    return (
      <FadeIn ccomponent="div">
        <NavList>
          <NavListItem>
            <StyledNavLink exact to={baseUrl} activeStyle={activeStyle}>
              <span>Checklist Overview</span>
              {filtersActive && (
                <FadeIn>
                  <FilterBadge>
                    <FilterIcon />
                  </FilterBadge>
                </FadeIn>
              )}
            </StyledNavLink>
          </NavListItem>
          {links.sidebar.map(link => this.buildNav(link, baseUrl))}
        </NavList>
      </FadeIn>
    );
  }
}

const mapStateToProps = state => ({
  checklists: activeChecklistsSelector(state),
  user: state.user,
  workbenchConfig: state.configs.workbench,
  org: state.auth.organization,
  filtersActive:
    state.checklist.filter.primary !== 'ALL' ||
    state.checklist.filter.secondary !== 'ALL',
});

export default connect(mapStateToProps)(WorkbenchShellNav);
