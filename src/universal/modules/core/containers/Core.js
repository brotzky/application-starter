import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { provideHooks } from 'redial';
// import { authCheck } from 'grow-actions/auth/auth-check';
import Modal from '../../../components/modal/containers/Modal';

/**
 * <Core />
 */
@provideHooks({
  // fetch: ({ dispatch, cookies }) => dispatch(authCheck(cookies)),
})
class Core extends Component {
  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
        <Modal />
      </div>
    );
  }
}

Core.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Core);
