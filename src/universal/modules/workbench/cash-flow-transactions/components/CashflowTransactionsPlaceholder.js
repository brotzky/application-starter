import React from 'react';
import styled from 'styled-components';

const CashflowTransactionsPlaceholderHeader = styled.div`
  height: 131.5px;
  background: ${props => props.theme.colors.greyLight};
  padding: 3rem;
`;

const CashflowTransactionsPlaceholderList = styled.ul`
  list-style: none;
`;

const CashflowTransactionsPlaceholderListItem = styled.li`
  height: 58px;
  background: ${props => props.theme.colors.greyLight};

  &:nth-child(odd) {
    background: white;
  }
`;

const CashflowTransactionsPlaceholder = () => (
  <div>
    <CashflowTransactionsPlaceholderHeader />
    <CashflowTransactionsPlaceholderHeader />
    <CashflowTransactionsPlaceholderList>
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
      <CashflowTransactionsPlaceholderListItem />
    </CashflowTransactionsPlaceholderList>
  </div>
);

export default CashflowTransactionsPlaceholder;
