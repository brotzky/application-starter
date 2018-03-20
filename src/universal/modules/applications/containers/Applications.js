import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AuthWrapper from '../../auth/containers/AuthWrapper';
import InfiniteScroll from 'react-infinite-scroller';
import { destroy } from 'redux-form';
import { getProductApplications } from 'grow-actions/product-applications/product-applications';
import { getProducts } from 'grow-actions/products/products';
import Pagination from '../../ui/pagination/containers/Pagination';
import ApplicationsHeader from '../components/ApplicationsHeader';
import ApplicationsList from '../components/ApplicationsList';
import ApplicationsSidebar from './ApplicationsSidebar';
import { FadeIn } from '../../ui/transitions/';
import { Card, Title } from '../../ui/components';
import Table from '../../ui/components/Table/Table';
import { getQueryParameters } from 'grow-utils/filters';
import { Spinner } from 'gac-ui/components/';

const ApplicationsCard = styled(Card)`
  padding: 2.5rem;
  background: #f9f9f9;
  border-radius: 2px;
  width: calc(100vw - 300px);
  overflow: auto;
`;

const ApplicationsContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  margin: 0 auto;
`;

const ApplicationsPlacholderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

class Applications extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    handlePagination: PropTypes.func.isRequired,
    hasMoreResults: PropTypes.func.isRequired,
    org: PropTypes.string.isRequired,
    updateData: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
  };

  componentDidMount() {
    const { dispatch, data, params, updateData } = this.props;
    const itemsPerPage = Number(data.itemsPerPage);
    if (data.applications.length === 0 || data.isStale) {
      if (params.page && Number.isInteger(Number(params.page))) {
        const page = Number(params.page);
        updateData({
          page,
          itemsPerPage,
          queryParams: {
            start: page * itemsPerPage - itemsPerPage,
            end: page * itemsPerPage,
            primaryRep: data.queryParams.primaryRep || '',
            state: data.queryParams.state,
          },
        });
      } else {
        updateData({
          page: 1,
          itemsPerPage: 20,
          queryParams: {
            start: 0,
            end: 20,
            primaryRep: '',
            state: '',
          },
        });
      }
    }

    dispatch(getProducts());

    dispatch(destroy('overrideNote'));
  }

  componentWillUpdate(nextProps) {
    const { page: nextPage } = nextProps.data;
    const { page: prevPage } = this.props.data;
    if (nextPage !== prevPage) {
      return this.props.dispatch(push(`/applications/${nextPage}`));
    }

    /**
     * Need to handle when a user clicks the Applicatiosn link again
     * when they're not on the first page. This will reset and refetch
     * the first page data.
     */
    if (prevPage > 1 && nextProps.location.pathname === '/applications') {
      this.props.updateData({
        page: 1,
        itemsPerPage: 20,
        queryParams: {
          start: 0,
          end: 20,
          primaryRep: '',
          state: '',
        },
      });
    }
  }

  render() {
    const {
      data,
      org,
      dispatch,
      handlePagination,
      hasMoreResults,
      updateData,
      user,
      appConfig,
    } = this.props;
    const queueControlsProps = {
      handlePagination,
      hasMoreResults,
      data,
      updateData,
      userEmail: user.email,
    };

    const queueListProps = {
      applications: data.applications,
      currentStep: data.queryParams.currentStep,
      dispatch,
      isFetching: data.isFetching,
      isLoaded: data.isLoaded,
      queryParams: data.queryParams,
      updateData,
      user,
    };

    const queueHeaderProps = {
      itemsPerPage: data.itemsPerPage,
      queryParams: data.queryParams,
      products: data.products,
      adminSteps: data.adminSteps,
      org,
      updateData,
      steps: appConfig.steps,
    };

    return (
      <FadeIn component={ApplicationsContainer}>
        <Title title="Applications" />
        <ApplicationsSidebar {...queueControlsProps} />
        <ApplicationsCard>
          {data.isFetching ? (
            <ApplicationsPlacholderContainer>
              <Spinner size={42} color="#448aff" />
            </ApplicationsPlacholderContainer>
          ) : (
            <Table gutters divided>
              <ApplicationsHeader {...queueHeaderProps} />
              <ApplicationsList {...queueListProps} />
            </Table>
          )}
        </ApplicationsCard>
      </FadeIn>
    );
  }
}

const mapStateToProps = state => ({
  data: state.queue,
  org: state.auth.organization,
  user: state.user,
  appConfig: state.configs.app.config,
  selected: state.filters.selected,
});

Applications = Pagination({
  fetchDataAction: getProductApplications,
  name: 'queue',
})(Applications);

export default AuthWrapper(connect(mapStateToProps)(Applications));
