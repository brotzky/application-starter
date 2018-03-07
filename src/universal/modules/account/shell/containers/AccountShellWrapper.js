import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getProducts } from 'grow-actions/products/products';

/**
 * AccountShellWrapper
 * A higher order compenent used to wrap components that require
 * an user specific queries
 *
 * @param {Component} WrappedComponent A React component.
 * @returns {Component} The WrappedComponent 
 */
const AccountShellWrapper = WrappedComponent => {
  class InitializeAccountData extends Component {
    componentDidMount() {
      const { dispatch, products, roles } = this.props;

      if (!products.length) {
        dispatch(getProducts());
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    products: state.queue.products,
    roles: state.users.roles,
  });

  return connect(mapStateToProps)(InitializeAccountData);
};

export default AccountShellWrapper;
