import React from 'react';
import styled from 'styled-components';
import { FadeInFast } from '../../../ui/transitions/';
import OverviewFinancialDashboard from './OverviewFinancialDashboard';
import OverviewPersonalLoan from './OverviewPersonalLoan';
import OverviewDepositAccount from './OverviewDepositAccount';

const OverviewProductsContainer = styled.div``;

/**
 * <OverviewProducts />
 * 
 * Note, it was a consious decision to create three separate, but seemingly very
 * similar components for each product. This is because of the potentially differences
 * each GAC product can have in the future.
 */
const OverviewProducts = ({ products }) => {
  // create three arrays, one for each current product
  const financialHealthProducts = products.filter(
    product => product.productCategory === 'financial-health',
  );
  const depositAccountProducts = products.filter(
    product => product.productCategory === 'deposit-account',
  );
  const personalLoanProducts = products.filter(
    product => product.productCategory === 'personal-loan',
  );

  return (
    <FadeInFast component="div">
      <OverviewProductsContainer>
        {financialHealthProducts.length > 0 && (
          <OverviewFinancialDashboard products={financialHealthProducts} />
        )}
        {depositAccountProducts.length > 0 && (
          <OverviewDepositAccount products={depositAccountProducts} />
        )}
        {personalLoanProducts.length > 0 && (
          <OverviewPersonalLoan products={personalLoanProducts} />
        )}
      </OverviewProductsContainer>
    </FadeInFast>
  );
};

export default OverviewProducts;
