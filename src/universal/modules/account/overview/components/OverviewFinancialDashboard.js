import React from 'react';
import styled from 'styled-components';

const ProductContainer = styled.div`margin-bottom: 2.25rem;`;

const ProductContainerHeader = styled.h2`
  border-bottom: 1px solid #dee4e7;
  font-size: 1.8rem;
  padding-bottom: 1.25rem;
  margin-bottom: 2.25rem;
`;

const ProductList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style-type: none;
`;

const Product = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
  padding: 2.25rem;
  margin-bottom: 2.25rem;
  width: calc(33% - 1.125rem);
  border: 1px solid #e8e8e8;
`;

const ProductHeader = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const ProductSubheader = styled.p`
  margin-bottom: 0;
  opacity: 0.6;
  font-size: 1.5rem;
`;

/**
 * OverviewFinancialDashboard - The highest level component for the Workbench view.
 * Contained within here is the Sidebar, Nav, and Dynamic content.
 */
const OverviewFinancialDashboard = ({ products }) => {
  return (
    <ProductContainer>
      <ProductContainerHeader>Financial Health</ProductContainerHeader>
      <ProductList>
        {products.map(product => (
          <Product key={product.id}>
            <ProductHeader>{product.prettyName}</ProductHeader>
            <ProductSubheader>{product.description}</ProductSubheader>
          </Product>
        ))}
      </ProductList>
    </ProductContainer>
  );
};

export default OverviewFinancialDashboard;
