import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import docCookies from 'grow-utils/cookies';
import initiGlobalThrottledEvents from 'grow-utils/throttleEvent';
import Modal from '../../ui/modal/containers/Modal';
import Notifications from '../../ui/notifications/containers/Notifications';
// import { ErrorBoundary } from '../../ui/components';
import { renderRoutes } from 'react-router-config';

/**
 * <Core />
 * Responsible for adding global components to our application
 * along with loading in all our initial global scripts and events
 */
class Core extends Component {
  componentDidMount() {
    initiGlobalThrottledEvents();
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    /**
     * If the SID cookie does not exist, but the accessToken is present inside
     * of the auth state then set the SID cookie to the accessToken value.
     */
    if (auth.accessToken) {
      return docCookies.setItem('SID', auth.accessToken);
    }
    return null;
  }

  render() {
    return (
      // <ErrorBoundary>
      <div>
        {renderRoutes(this.props.route.routes)}
        <Modal />
        <Notifications />
      </div>
      // </ErrorBoundary>
    );
  }
}

Core.propTypes = {
  auth: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.string]),
  ).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps)(Core);
