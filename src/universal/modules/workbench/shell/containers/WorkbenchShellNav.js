import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FadeIn } from '../../../ui/transitions/';
import { activeChecklistsSelector } from 'gac-utils/selectors';

/**
 * WorkbenchShellNav is the main navigation for the workbench.
 * Fairly static except the Application name "Personal Loan Application"
 * and the baseUrl built off the workbench params.
 */
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
    <g className="nc-icon-wrapper" fill="#448aff">
      <path
        data-color="color-2"
        fill="#448aff"
        d="M9,15H7c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1v0 C10,14.552,9.552,15,9,15z"
      />{' '}
      <path
        fill="#448aff"
        d="M11,11H5c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h6c0.552,0,1,0.448,1,1v0C12,10.552,11.552,11,11,11z"
      />{' '}
      <path
        data-color="color-2"
        fill="#448aff"
        d="M13,7H3C2.448,7,2,6.552,2,6v0c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1v0 C14,6.552,13.552,7,13,7z"
      />{' '}
    </g>
  </svg>
);

class WorkbenchShellNav extends Component {
  buildNav = (link, baseUrl) => {
    return (
      <FadeIn key={link.path}>
        <li key={link.text} className="WorkbenchShellNav__item">
          <Link
            className="WorkbenchShellNav__link"
            activeClassName="WorkbenchShellNav__link--active"
            to={`${baseUrl}${link.path}`}
            id={`${link.text.replace(/\s/g, '').toLowerCase()}Section`}
          >
            {link.text}
            <FadeIn className="WorkbenchShellNav__badge-container">
              {this.renderRemainingItems(link.badge)}
            </FadeIn>
          </Link>
        </li>
      </FadeIn>
    );
  };

  renderRemainingItems = category => {
    const { checklists, params } = this.props;
    const remainingItems = checklists.flatList.filter(
      item =>
        item.category === category &&
        item.verified !== 'VERIFIED' &&
        item.userIds.includes(params.memberId),
    );

    if (remainingItems.length) {
      return (
        <span className="WorkbenchShellNav__badge">
          {remainingItems.length}
        </span>
      );
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
      <FadeIn
        className="WorkbenchShellNav WorkbenchShellSection"
        component="div"
      >
        <ul className="WorkbenchShellNav__list">
          <li className="WorkbenchShellNav__item">
            <Link
              className="WorkbenchShellNav__link"
              activeClassName="WorkbenchShellNav__link--active"
              to={`${baseUrl}`}
            >
              <span>Checklist Overview</span>
              {filtersActive && (
                <FadeIn>
                  <FilterBadge>
                    <FilterIcon />
                  </FilterBadge>
                </FadeIn>
              )}
            </Link>
          </li>
          {links.sidebar.map(link => this.buildNav(link, baseUrl))}
        </ul>
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
