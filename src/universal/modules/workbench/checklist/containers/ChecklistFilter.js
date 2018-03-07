import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { activeChecklistsSelector } from 'gac-utils/selectors';
import { UPDATE_CHECKLIST_FILTER } from '../actions/actions-update-checklist-state';

const ChecklistFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding 0 2.8125rem;
  border-bottom: 1px solid #eee;
`;

const FilterButton = styled.button`
  margin: 1rem 0.3rem 1.2rem 0;

  color: ${props => (props.active ? '#1c71ff' : props.theme.colors.greyMid)};
  background: ${props => (props.active ? '#e7f0fb' : 'transparent')};
  font-size: 1.5rem;
  transition: all 200ms ease;
  border-radius: 6px;
  padding: 4px 8px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: ${props =>
      props.active ? '#e7f0fb' : props.theme.colors.greyBg};
    color: ${props => (props.active ? '#1c71ff' : props.theme.colors.black)};
  }
`;

const secondaryFilters = [
  {
    type: 'RESOLVED',
    name: 'Resolved',
  },
  {
    type: 'UNRESOLVED',
    name: 'Unresolved',
  },
  {
    type: 'PASSED_AUTOMATION',
    name: 'Passed Automation',
  },
  {
    type: 'FAILED_AUTOMATION',
    name: 'Failed Automation',
  },
];

class ChecklistFilter extends Component {
  handleFilterClick = clickedFilter => {
    const { dispatch, filter } = this.props;

    /**
     * If a user clicks on the secondary filter buttons and
     * they're the same as the active button remove all the
     * secondy filters
     */
    if (
      clickedFilter.secondary === filter.secondary &&
      clickedFilter.primary === filter.primary &&
      clickedFilter.type !== 'primary'
    ) {
      clickedFilter.secondary = 'ALL';
    }

    /**
     * If a user clicks on the primary filter buttons and
     * they're the same as the active button remove all the
     * primary filters
     */
    if (
      clickedFilter.secondary === filter.secondary &&
      clickedFilter.primary === filter.primary &&
      clickedFilter.type === 'primary'
    ) {
      clickedFilter.primary = 'ALL';
    }

    this.props.dispatch({
      type: UPDATE_CHECKLIST_FILTER,
      payload: clickedFilter,
    });
  };

  render() {
    const { filter: { primary, secondary }, primaryFilters } = this.props;
    const path = window.location.pathname;

    const hideFilter =
      path.includes('notes') || path.includes('application-status');

    if (hideFilter || !primaryFilters) return null;

    return (
      <ChecklistFilterContainer>
        <div>
          {primaryFilters.map(configFilter => (
            <FilterButton
              key={configFilter.primary}
              onClick={() =>
                this.handleFilterClick({
                  primary: configFilter.primary,
                  secondary,
                  type: 'primary',
                })}
              active={primary === configFilter.primary}
            >
              {configFilter.primary}
            </FilterButton>
          ))}
        </div>
        <div>
          {secondaryFilters.map(secondaryFilter => (
            <FilterButton
              key={secondaryFilter.type}
              onClick={() =>
                this.handleFilterClick({
                  primary,
                  secondary: secondaryFilter.type,
                })}
              active={secondary === secondaryFilter.type}
            >
              {secondaryFilter.name}
            </FilterButton>
          ))}
        </div>
      </ChecklistFilterContainer>
    );
  }
}

const mapStateToProps = state => ({
  activeChecklists: activeChecklistsSelector(state),
  primaryFilters:
    state.configs.workbench.config &&
    state.configs.workbench.config.checklist &&
    state.configs.workbench.config.checklist.primaryFilters,
  filter: state.checklist.filter,
});

export default connect(mapStateToProps)(ChecklistFilter);
