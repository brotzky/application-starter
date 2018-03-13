import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getProducts } from 'grow-actions/products/products';
import { Card } from '../../../ui/components';
import AccountShellWrapper from '../../shell/containers/AccountShellWrapper';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import OverviewProducts from '../components/OverviewProducts';
import {
  orgPropType,
  dispatchPropType,
  productsPropType,
} from 'gac-utils/proptypes';

const OrganizationLogo = styled.img`
  width: 160px;
  height: 55px;
`;

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
    const { organization, products } = this.props;

    return (
      <Card>
        <AccountShellSection padding>
          <AccountShellHeader
            text="Products"
            action={
              organization && (
                <OrganizationLogo
                  src={`/images/logos/organizations/${organization}.svg`}
                />
              )
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

Overview.defaultProps = {
  organization: 'grow',
};

Overview.propTypes = {
  organization: orgPropType,
  products: productsPropType.isRequired,
  dispatch: dispatchPropType.isRequired,
};

const mapStateToProps = state => ({
  isFetchingProducts: state.queue.isFetchingProducts,
  products: state.queue.products,
  organization: state.auth.organization.toLowerCase(),
});

export default AccountShellWrapper(connect(mapStateToProps)(Overview));
