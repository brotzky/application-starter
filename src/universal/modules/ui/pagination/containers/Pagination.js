import React, { Component } from 'react';
import queryString from 'query-string';
import omitBy from 'lodash/omitBy';
import { capitalizeString } from 'grow-utils/stringFormatting';

const Pagination = newProps =>
  function PaginationWrapper(WrappedComponent) {
    return class PaginationClass extends Component {
      constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.hasMoreResults = this.hasMoreResults.bind(this);
        this.updateData = this.updateData.bind(this);
        this.actionName = capitalizeString(
          newProps.name,
          '-',
          '_',
        ).toUpperCase();
      }

      fetchData(queryParams, id) {
        const removeEmptyParams = omitBy(
          queryParams,
          value => value === '' || value === undefined,
        );
        const queryParamsString = queryString.stringify(removeEmptyParams);
        const { dispatch } = this.props;
        if (id) {
          return dispatch(newProps.fetchDataAction(id, queryParamsString));
        }
        return dispatch(newProps.fetchDataAction(queryParamsString));
      }

      updateData(options, id) {
        const { data, dispatch } = this.props;
        const { page, itemsPerPage, queryParams } = options;
        const futureQueryParams = Object.assign(
          {},
          data.queryParams,
          queryParams,
        );

        if (page) {
          dispatch({ type: `${this.actionName}_GO_TO_PAGE`, payload: page });
        }
        if (queryParams) {
          dispatch({
            type: `${this.actionName}_UPDATE_QUERY_PARAMS`,
            payload: queryParams,
          });
        }

        if (itemsPerPage) {
          dispatch({
            type: `${this.actionName}_UPDATE_ITEMS_PER_PAGE`,
            payload: itemsPerPage,
          });
        }

        return this.fetchData(futureQueryParams, id);
      }

      incrementPage(page) {
        return page + 1;
      }
      decrementPage(page) {
        return page - 1;
      }

      hasMoreResults(direction) {
        /**
         * This is a temporary fixed since we've removed resources from the all API
         * calls in GAC. Before they were used to see if there are more pages to
         * query.
         */
        return true;

        const { data } = this.props;
        return (
          data.resources &&
          data.resources.length &&
          data.resources.find(
            resource =>
              resource.serviceName === `${direction.toUpperCase()}_RESULT_SET`,
          )
        );
      }

      handlePagination(direction, id) {
        if (!this.hasMoreResults(direction)) {
          return false;
        }
        const { data, data: { itemsPerPage = 10 } } = this.props;
        const itemsPerPageInt = parseInt(itemsPerPage, 10);
        const nextPage =
          direction === 'next'
            ? this.incrementPage(data.page)
            : this.decrementPage(data.page);
        return this.updateData(
          {
            page: nextPage,
            queryParams: {
              start: nextPage * itemsPerPageInt - itemsPerPageInt,
              end: nextPage * itemsPerPageInt,
            },
          },
          id,
        );
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            handlePagination={this.handlePagination}
            hasMoreResults={this.hasMoreResults}
            updateData={this.updateData}
          />
        );
      }
    };
  };

export default Pagination;
