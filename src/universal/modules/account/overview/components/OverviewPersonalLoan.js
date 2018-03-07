import React from 'react';
import styled from 'styled-components';

const PersonalLoanOverview = styled.div`
  display: flex;
  flex-direction: column;
`;

const PersonalLoanHeader = styled.h2`
  font-size: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #dee4e7;
`;

const ProductsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const ProductContainer = styled.li`
  border: 1px solid #dee4e7;
  border-radius: 2px;
  padding: 2.25rem;
  margin: ${props =>
    props.products > 2 ? '2.25rem 0' : '2.25rem 2.25rem 2.25rem 0'};
  width: calc(33% - 1.125rem);
`;

const ProductContainerHeader = styled.h2`border-bottom: 1px solid red;`;

const ProductHeader = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const ProductSubheader = styled.p`
  color: grey;
  margin-bottom: 0;
  font-size: 1.5rem;
`;

/**
 * OverviewPersonalLoan - The highest level component for the Workbench view.
 * Contained within here is the Sidebar, Nav, and Dynamic content.
 */
const OverviewPersonalLoan = ({ products }) => (
  <PersonalLoanOverview>
    <PersonalLoanHeader>Personal Loans</PersonalLoanHeader>
    <ProductsContainer products={products.length}>
      {products.map(product => (
        <ProductContainer key={product.id}>
          <ProductHeader>{product.prettyName}</ProductHeader>
          <ProductSubheader>{product.description}</ProductSubheader>
        </ProductContainer>
      ))}
    </ProductsContainer>
  </PersonalLoanOverview>
);

export default OverviewPersonalLoan;
