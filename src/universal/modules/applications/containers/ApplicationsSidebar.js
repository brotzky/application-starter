import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { Panel } from '../../ui/components';
import { InfoCircle } from '../../ui/icons';
import { FormButton } from '../../forms/fields/';
import SelectedFilter from '../components/SelectedFilter';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { getQueryParameters } from 'grow-utils/filters';
import {
  ADD_SELECTED_FILTER,
  UPDATE_SELECTED_FILTER,
  DELETE_SELECTED_FILTER,
} from '../reducers/constants';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshSmall,
} from '../../ui/icons';

const Sidebar = styled.div`
  width: 300px;
  min-height: calc(100vh - 55px);
  padding: 2.5rem;
  background: #fff;
`;
const List = styled.ul`
  list-style-type: none;
`;
const FilterListItem = styled.li`
  font-size: 12px;
  padding: 4px 8px 4px;
  &:hover {
    background: #d9edf7;
  }
  ${props => props.selected && 'background: grey;'};
`;
const FilterListItemCategory = styled.li`
  padding: 4px 8px 4px;
  font-size: 14px;
  font-weight: 600;
`;
const PaginationBox = styled.div`
  padding: 6px 8px 6px;
  background-color: #d9edf7;
  border: 1px solid transparent;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  position: relative;
  cursor: pointer;
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  div {
    flex: 1;
    text-align: center;
  }
`;
const PaginationSelect = styled.span`
  width: 90px;
  background: rgba(0, 0, 0, 0.3);
  color: hsla(0, 0%, 100%, 0.9);
  display: flex;
  align-items: center;
  height: 28px;
  border-radius: 4px;
  padding: 0 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  margin: 0 auto;
  select {
    margin: 0;
    padding-right: 1.5rem;
    cursor: pointer;
    text-transform: none;
    appearance: none;
    border: none;
    background-color: transparent;
    width: 100%;
  }
  svg {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 52%;
    right: 0.75rem;
    transform: translateY(-50%);
    pointer-events: none;
    color: hsla(0, 0%, 100%, 0.9);
  }
`;
const PaginationButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 6px transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  margin: 0 5px 0;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #fff;
  }
`;
class ApplicationsSidebar extends Component {
  state = {
    filters: {},
  };

  /**
   * Process filters.
   */
  componentDidMount() {
    this.processFilters();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.processFilters();
    }
  }

  /**
   * Get options for filters that have select values.
   */
  processFilters = () => {
    const {
      adminSteps,
      products,
      steps,
      filterOptions,
      userEmail,
    } = this.props;
    let filters = Object.assign({}, filterOptions);
    if (adminSteps && adminSteps.length) {
      const adminOptions = adminSteps.map(admin => {
        return { value: admin.name, label: admin.prettyName };
      });
      filters.application.adminSteps.options = adminOptions;
    }
    if (products && products.length) {
      const productOptions = products.map(product => {
        return {
          value: product.productCategory,
          label: product.prettyName,
        };
      });
      filters.application.productCategories.options = productOptions;
    }
    if (steps && steps.length) {
      const stepOptions = steps.map(step => {
        return { value: step, label: capitalizeString(step, '-', ' ') };
      });
      filters.application.currentSteps.options = stepOptions;
    }
    if (userEmail) {
      filters.application.primaryRep.options = new Array(
        { label: 'Me', value: userEmail },
        { label: 'Unclaimed', value: 'unclaimed' },
        { label: 'Everyone', value: '' },
      );
    }
    this.setState({ filters });
  };

  handleSubmit = () => {
    const { selected, updateData, data: { itemsPerPage } } = this.props;
    let queryParams = getQueryParameters(selected);

    updateData({
      page: 1,
      queryParams: {
        ...queryParams,
        start: 0,
        end: itemsPerPage || 15,
      },
    });
  };

  render() {
    const { filters } = this.state;
    const {
      handleUpdate,
      handleRemove,
      handleAdd,
      selected,
      data: { isFetching, itemsPerPage, page },
      handlePagination,
      hasMoreResults,
      updateData,
    } = this.props;
    const selectedEmpty = !Object.keys(selected).length;
    return (
      <Sidebar>
        <List>
          <li style={{ padding: '4px 6px 4px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Paginate{' '}
              <span title="Paginate the results.">
                <InfoCircle height="10" width="10" />
              </span>
            </span>
          </li>

          <li>
            <PaginationBox style={{ display: 'flex' }}>
              <div>
                <span>Items per page</span>
                <PaginationSelect>
                  <select
                    id="queueItems"
                    name="queue-items"
                    value={itemsPerPage || 15}
                    onChange={event =>
                      updateData({
                        page: 1,
                        queryParams: {
                          ...getQueryParameters(selected),
                          start: 0,
                          end: Number(event.target.value),
                        },
                        itemsPerPage: Number(event.target.value),
                      })
                    }
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <ChevronDown />
                </PaginationSelect>
              </div>
              <div>
                <span>Page {page}</span>
                <br />
                <PaginationButton
                  type="button"
                  onClick={() => handlePagination('previous')}
                  disabled={isFetching || page === 1}
                >
                  <ChevronLeft />
                </PaginationButton>
                <PaginationButton
                  type="button"
                  onClick={() => handlePagination('next')}
                  disabled={isFetching | !hasMoreResults('next')}
                >
                  <ChevronRight />
                </PaginationButton>
              </div>

              <br />
            </PaginationBox>
          </li>
          <li style={{ padding: '4px 6px 4px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Filter applications{' '}
              <span title="Filter results using these fields.">
                <InfoCircle height="10" width="10" />
              </span>
            </span>
          </li>

          {Object.keys(filters).map(category => {
            let filteritems = Object.keys(filters[category]).map(key => {
              const filterItem = filters[category][key];
              const found = Object.keys(selected).find(select => {
                return key === select;
              });
              if (!found) {
                return (
                  <FilterListItem
                    key={`filter-${category}-${key}`}
                    onClick={event => handleAdd(key, filterItem)}
                  >
                    {filterItem.label}
                  </FilterListItem>
                );
              } else {
                return (
                  <SelectedFilter
                    key={`filter-${category}-${key}`}
                    data={{ key, item: selected[key] }}
                    onRemove={handleRemove}
                    onUpdate={handleUpdate}
                    value={selected[key].value}
                  />
                );
              }
            });

            return [
              <FilterListItemCategory key={`filter-${category}`}>
                {capitalizeString(category, '_', ' ')}
              </FilterListItemCategory>,
              ...filteritems,
            ];
          })}
        </List>
        <FormButton
          isSubmitting={isFetching}
          disabled={isFetching}
          buttonText="Apply Filters"
          type="submit"
          onClick={this.handleSubmit}
        />
      </Sidebar>
    );
  }
}

const mapStateToProps = state => ({
  adminSteps: state.queue.adminSteps,
  products: state.queue.products,
  steps: state.configs.app.config.steps,
  selected: state.filters.selected,
  filterOptions: state.filters.filterOptions,
});
const mapDispatchToProps = dispatch => {
  return {
    handleAdd: (key, item) =>
      dispatch({
        type: ADD_SELECTED_FILTER,
        key,
        item,
      }),
    handleRemove: key =>
      dispatch({
        type: DELETE_SELECTED_FILTER,
        key,
      }),
    handleUpdate: (key, value) =>
      dispatch({
        type: UPDATE_SELECTED_FILTER,
        key,
        value,
      }),
  };
};
ApplicationsSidebar.propTypes = {
  adminSteps: PropTypes.array,
  products: PropTypes.array,
  steps: PropTypes.array,
  selected: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(
  ApplicationsSidebar,
);
