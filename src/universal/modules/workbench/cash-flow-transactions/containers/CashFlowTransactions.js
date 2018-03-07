import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getBanking } from 'grow-actions/cashflow-transactions/cashflow-transactions';
import { permissionSelector } from 'gac-utils/selectors';
import CashflowTransactionsPlaceholder from '../components/CashflowTransactionsPlaceholder';
import BankAccountsController from '../components/BankAccountsController';
import { EmptyState, ViewPermission } from '../../../ui/components';
import { EmptyCashflow } from '../../../ui/icons/';
import { FadeIn } from '../../../ui/transitions';

const BankAccountsContainer = styled.div`
  padding: 2.25rem 2.8125rem;
`;
class CashFlowTransactions extends Component {
  componentDidMount() {
    const {
      dispatch,
      hasPermission,
      params,
      cashflowTransactions,
    } = this.props;

    if (!cashflowTransactions.bankAccounts.length && hasPermission) {
      dispatch(getBanking(params.memberId));
    }
  }

  renderNoData() {
    const { member, cashflowTransactions } = this.props;
    return (
      <div className="ChecklistPlaceholder">
        <EmptyState
          Icon={EmptyCashflow}
          text={`${member.firstName} ${
            member.lastName
          } has not connected any bank accounts yet`}
          errors={cashflowTransactions.errors}
        />
      </div>
    );
  }

  render() {
    const {
      cashflowTransactions: { bankAccounts, isFetching },
      hasPermission,
    } = this.props;

    if (isFetching) {
      return <CashflowTransactionsPlaceholder />;
    }

    if (!bankAccounts.length && hasPermission) {
      return this.renderNoData();
    }

    return (
      <FadeIn>
        <ViewPermission permission="VIEW_FINSNAP">
          <BankAccountsContainer>
            <BankAccountsController bankAccounts={bankAccounts} />
          </BankAccountsContainer>
        </ViewPermission>
      </FadeIn>
    );
  }
}

const mapStateToProps = state => ({
  cashflowTransactions: state.cashflowTransactions,
  member: state.member.member,
  hasPermission: permissionSelector(state, 'VIEW_FINSNAP'),
});

export default connect(mapStateToProps)(CashFlowTransactions);
