import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import numeral from 'numeral';
import { ChevronRight } from '../../../../modules/ui/icons/';

const DescriptionItem = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  width: 54%;
`;

const AmountItem = styled.div`
  text-align: right;
  width: 13%;
  font-size: 1.4rem;
  margin-right: 13rem;
`;

const DateItem = styled.div`
  width: 16%;
  font-size: 1.4rem;
`;

const TransactionItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  padding-bottom: ${props => (props.active ? 0 : '')};
`;

const StyledChevronRight = styled(ChevronRight)`
  transform: rotate(0deg);
  transition: all 250ms ease;
  transform: ${props => (props.isOpen ? 'rotate(90deg)' : '')};
`;

const Category = styled.div`
  position: relative;
  top: -6px;
  color: ${props => props.theme.colors.greyMid};
  font-size: 1.3rem;
  display: ${props => (props.active ? 'inline-block' : 'none')};
  margin-bottom: 0.5rem;
`;

class BankAccountsTransactionItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isArrowOpen: true };
  }

  handleArrowClick = () => {
    this.setState({ isArrowOpen: !this.state.isArrowOpen });
  };

  render() {
    const { transaction } = this.props;
    const { isArrowOpen } = this.state;

    return (
      <div>
        <TransactionItemRow
          onClick={this.handleArrowClick}
          active={isArrowOpen}
        >
          <DescriptionItem>{transaction.description}</DescriptionItem>
          <AmountItem>
            {numeral(transaction.amount).format('$0,0.00')}
          </AmountItem>
          <DateItem>
            {moment(transaction.transactionDate).format('MMM Do, YYYY')}
          </DateItem>
          <StyledChevronRight isOpen={isArrowOpen} />
        </TransactionItemRow>
        <Category active={isArrowOpen}>
          {transaction.category || 'Uncategorized'}
        </Category>
      </div>
    );
  }
}

BankAccountsTransactionItem.propTypes = {
  transaction: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  ).isRequired,
};

export default BankAccountsTransactionItem;
