import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AuthWrapper from '../../auth/containers/AuthWrapper';
import { destroy } from 'redux-form';
import { getProductApplications } from 'grow-actions/product-applications/product-applications';
import { getProducts } from 'grow-actions/products/products';
import Pagination from '../../ui/pagination/containers/Pagination';
import QueueHeader from '../components/QueueHeader';
import QueueList from '../components/QueueList';
import QueueControls from '../components/QueueControls';
import { FadeIn } from '../../ui/transitions/';

class Queue extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    handlePagination: PropTypes.func.isRequired,
    hasMoreResults: PropTypes.func.isRequired,
    org: PropTypes.string.isRequired,
    permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
    updateData: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
  };

  componentDidMount() {
    const { dispatch, data, match: { params }, updateData } = this.props;

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
          itemsPerPage: 15,
          queryParams: {
            start: 0,
            end: 15,
            primaryRep: '',
            state: '',
          },
        });
      }
    }

    dispatch(getProducts());

    dispatch(destroy('overrideNote'));
    dispatch(destroy('recommendationComments'));
    dispatch(destroy('recommendationDecline'));
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
        itemsPerPage: 15,
        queryParams: {
          start: 0,
          end: 15,
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
      permissions,
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
      showQueueMenu: data.showQueueMenu,
      queryParams: data.queryParams,
      permissions,
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
      <FadeIn className="Member__box Queue" component="div">
        <QueueControls {...queueControlsProps} />
        <QueueHeader {...queueHeaderProps} />
        <QueueList {...queueListProps} />
      </FadeIn>
    );
  }
}

const mapStateToProps = state => ({
  data: state.queue,
  org: state.auth.organization,
  permissions: (state.permissions && state.permissions.permissions) || {},
  user: state.user,
  appConfig: state.configs.app.config,
});

Queue = Pagination({
  fetchDataAction: getProductApplications,
  name: 'queue',
})(Queue);

export default AuthWrapper(connect(mapStateToProps)(Queue));
