import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getProducts } from 'grow-actions/products/products';
import { Card } from '../../../ui/components';
import AccountShellWrapper from '../../shell/containers/AccountShellWrapper';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import OverviewProducts from '../components/OverviewProducts';

const OrganizationLogo = styled.img`height: 35px;`;

/**
 *  <Overview />
 * pathname: /account/overview
 * 
 * Overview takes in the product definitions passed from backend and displays it to
 * the end user. Currently we support Financial Health, Deposit Accounts, and Personal Loans
 * 
 * @class Overview
 * @extends {Component}
 */
class Overview extends Component {
  componentDidMount() {
    const { dispatch, products } = this.props;

    if (!products.length) {
      dispatch(getProducts());
    }
  }

  render() {
    const { isFetchingProducts, organization, products } = this.props;

    return (
      <Card>
        <AccountShellSection padding>
          <AccountShellHeader
            text="Products"
            action={
              <OrganizationLogo
                src={`/static/img/logos/organizations/${organization}.svg`}
              />
            }
          />
          {this.props.isFetchingProducts ? (
            <div style={{ color: '#212121' }}>Loading...</div>
          ) : (
            <OverviewProducts products={products} />
          )}
        </AccountShellSection>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  isFetchingProducts: state.queue.isFetchingProducts,
  products: state.queue.products,
  organization: state.auth.organization.toLowerCase(),
});

export default AccountShellWrapper(connect(mapStateToProps)(Overview));
