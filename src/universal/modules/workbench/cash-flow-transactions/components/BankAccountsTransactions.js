import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BankAccountsTransactionItem from './BankAccountsTransactionItem';

const TransactionContainer = styled.div`
  margin-bottom: 3rem;
  min-height: 385px;
`;

const TransactionsHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  margin: 1rem auto;
  padding-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const AmountHeader = styled.div`
  text-align: right;
  width: 13%;
  margin-right: 13rem;
`;

const DateHeader = styled.div`width: 18.7%;`;

const DescriptionHeader = styled.div`width: 54%;`;

const BankAccountsTransactions = props => {
  const { sortedTransactions } = props;

  return (
    <TransactionContainer>
      <TransactionsHeaderRow>
        <DescriptionHeader>Description</DescriptionHeader>
        <AmountHeader>Amount</AmountHeader>
        <DateHeader>Date</DateHeader>
      </TransactionsHeaderRow>
      {sortedTransactions.map(transaction => (
        <BankAccountsTransactionItem
          key={transaction.transactionId}
          transaction={transaction}
        />
      ))}
    </TransactionContainer>
  );
};

BankAccountsTransactions.propTypes = {
  sortedTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BankAccountsTransactions;
