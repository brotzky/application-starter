import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import BankAccountsAccount from './BankAccountsAccount';
import BankAccountsTransactions from './BankAccountsTransactions';
import Pagination from '../pagination';
import { EmptyState } from '../../../ui/components';
import { EmptyCashflow, Ex, MagnifyGlass } from '../../../ui/icons/';

const BankAccountsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const TransactionMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
`;

const Form = styled.form`
  display: flex;
  width: 49%;
`;

const StyledMagnifyGlass = styled(MagnifyGlass)`
  height: 100%;
  padding: 0.8rem 0.8rem 0.8rem 1rem;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 1px solid ${props => props.theme.colors.grey};
  border-right: none;
  fill: #717070;
  width: 40px;
`;

const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.grey};
  border-right: none;
  border-left: none;
  padding: 1.2rem 1.3rem 1.2rem 0.5rem;
  font-size: 1.4rem;
  flex-grow: 4;
`;

const ResetButtonContainer = styled.div`
  display: flex;
  align-items: center;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 1px solid ${props => props.theme.colors.grey};
  background: white;
  color: ${props => props.theme.colors.grey};
  font-weight: 600;
  font-size: 1.4rem;
  padding: 0.5rem 1.3rem;
  transition: all 200ms ease;
`;

const ResetButton = styled.div`
  cursor: pointer;
  border-radius: 50%;
  fill: #fff;
  background: #d5d7d8;
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    background: ${props => props.theme.colors.blue};
    fill: #fff;
  }

  svg {
    display: block;
    padding: 4px;
    height: 17px;
    width: 17px;
  }
`;

const TransactionSort = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 49%;
`;
const SortButton = styled.button`
  border: ${props =>
    props.active
      ? `1px solid ${props.theme.colors.blue}`
      : `1px solid ${props.theme.colors.grey}`};
  border-right: none;
  font-weight: 500;
  font-size: 1.4rem;
  background: ${props => (props.active ? props.theme.colors.blue : '')};
  color: ${props => (props.active ? 'white' : props.theme.colors.greyMid)};
  padding: 0.5rem 1.3rem;
  transition: all 200ms ease;

  &:first-of-type {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  &:last-of-type {
    margin-right: 0;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-right: ${props =>
    props.active
      ? `1px solid ${props.theme.colors.blue}`
      : `1px solid ${props.theme.colors.grey}`};
  }

  &:hover {
    background: ${props => props.theme.colors.greyBg};
    border: 1px solid ${props => props.theme.colors.grey};
    border-right: none;
    &:last-of-type {
      border-right: ${props => `1px solid ${props.theme.colors.grey}`};
    }
    color: ${props => props.theme.colors.black};
  }
`;

const SortTitle = styled.div`
  font-weight: 600;
  padding: 0.7rem;
`;
const ChecklistPlaceholder = styled.div`
  background-color: white;
  box-shadow: 0 1px 4px rgba(black, 0.1);
  height: 505px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

class BankAccountsController extends Component {
  constructor(props) {
    super(props);
    const { bankAccounts } = this.props;
    const allBanks = bankAccounts.map(acc => acc.accountId); // id of all the banks
    const allTransactions = flatten(bankAccounts.map(acc => acc.transactions)); // all transactions from all bank accts

    // filter to only the transactions specific to the user's bank acct, sorted by most Recent by default
    const filteredTransactions = allTransactions
      .filter(transaction => allBanks.includes(transaction.accountId))
      .sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate),
      );

    this.state = {
      allTransactions,
      selectedBanks: allBanks, // id of the banks selected
      sortBy: 'Recent',
      initialTransactions: filteredTransactions,
      sortedTransactions: filteredTransactions,
      allBanks,
      itemsForEachPage: [],
      searchInput: '',
      searchResult: [],
    };
  }

  componentWillMount() {
    this.getItemsForEachPage(this.state.initialTransactions);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortedTransactions !== this.state.sortedTransactions) {
      this.refreshSorting();
    }
    // If bank toggle has been triggered
    if (prevState.selectedBanks !== this.state.selectedBanks) {
      this.getItemsForEachPage(this.state.sortedTransactions);
    }

    // update only when the sort changes
    if (prevState.sortBy !== this.state.sortBy) {
      this.getItemsForEachPage(this.state.sortedTransactions);
    }

    // if there's search terms in input field
    if (this.state.searchInput !== '') {
      if (prevState.searchResult !== this.state.searchResult) {
        this.getItemsForEachPage(this.state.searchResult);
      }
      /**
       * reset to initialTransactions if (1) no search terms and (2) changes in search result
       * which means the input has been cleared and the search has been done at least once
       */
    } else if (prevState.searchResult !== this.state.searchResult) {
      this.getItemsForEachPage(this.state.initialTransactions);
    }
  }

  /**
   * Slice filtered transaction items into an array of arrays. Indices will be used to mapped
   * to the pagination (page number)
   * @param {Array} transactions an array of transaction that needs to be sliced into pages
   */
  getItemsForEachPage = transactions => {
    const itemsForEachPage = [];
    const { itemsPerPage } = this.props;

    const numberOfPages = Math.ceil(transactions.length / itemsPerPage);
    let startIndex = 0;
    let endIndex = itemsPerPage;

    for (let i = 0; i < numberOfPages; i++) {
      itemsForEachPage.push(transactions.slice(startIndex, endIndex));
      startIndex += itemsPerPage;
      endIndex += itemsPerPage;
    }
    this.setState({ itemsForEachPage });
  };

  /**
   * Handles the toggling of all different bank accounts within the header of
   * the Bank Accounts transcations page.
   */
  handleBankToggling = id => {
    const { selectedBanks } = this.state;

    const newlySelectedBanks = selectedBanks.includes(id)
      ? selectedBanks.filter(bankId => bankId !== id)
      : [...selectedBanks, id];

    const { allTransactions } = this.state;

    const filteredTransactions = allTransactions.filter(transaction =>
      newlySelectedBanks.includes(transaction.accountId),
    );

    this.setState({
      selectedBanks: newlySelectedBanks,
      sortedTransactions: filteredTransactions,
      initialTransactions: filteredTransactions, // update the list to prepare for the search
    });
  };

  // sort transactions from most recent to the oldest
  handleSortRecent = () => {
    const { searchResult, sortedTransactions } = this.state;
    const listToSort =
      searchResult.length !== 0 ? searchResult : sortedTransactions;

    const newSortedList = listToSort.sort(
      (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate),
    );

    this.setState({
      sortedTransactions: newSortedList,
      sortBy: 'Recent',
    });
  };

  // sort transactions from oldest to most recent
  handleSortOldest = () => {
    const { searchResult, sortedTransactions } = this.state;
    const listToSort =
      searchResult.length !== 0 ? searchResult : sortedTransactions;

    const newSortedList = listToSort.sort(
      (a, b) => new Date(a.transactionDate) - new Date(b.transactionDate),
    );
    this.setState({
      sortedTransactions: newSortedList,
      sortBy: 'Oldest',
    });
  };

  // sort transactions from the highest amount to the lowest
  handleSortHighest = () => {
    const { searchResult, sortedTransactions } = this.state;
    const listToSort =
      searchResult.length !== 0 ? searchResult : sortedTransactions;

    const newSortedList = listToSort.sort((a, b) => b.amount - a.amount);

    this.setState({
      sortedTransactions: newSortedList,
      sortBy: 'Highest',
    });
  };

  // sort transactions from the lowest amount to the highest
  handleSortLowest = () => {
    const { searchResult, sortedTransactions } = this.state;
    const listToSort =
      searchResult.length !== 0 ? searchResult : sortedTransactions;

    const newSortedList = listToSort.sort((a, b) => a.amount - b.amount);

    this.setState({
      sortedTransactions: newSortedList,
      sortBy: 'Lowest',
    });
  };

  // Fire on any changes to the search input field. Also perform search here
  handleKeyChange = event => {
    const { initialTransactions } = this.state;
    const options = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 50,
      minMatchCharLength: 1,
      keys: ['description', 'category', 'tags'],
    };
    const fuse = new Fuse(initialTransactions, options);
    let result;
    if (event.target.value === '') {
      result = [];
    } else {
      result = fuse.search(event.target.value);
    }

    this.setState({
      searchResult: result,
      searchInput: event.target.value,
    });
  };

  // to prevent resetting the form on "Enter"
  handleSubmit = event => event.preventDefault();

  // Reset the transaction list to initial state
  handleSearchReset = event => {
    event.preventDefault();
    this.setState({
      sortedTransactions: this.state.initialTransactions,
      sortBy: 'Recent',
      searchInput: '',
      searchResult: [],
    });
  };

  // util function to make sure the current list is sorted properly
  refreshSorting = () => {
    switch (this.state.sortBy) {
      case 'Recent':
        this.handleSortRecent();
        break;
      case 'Oldest':
        this.handleSortOldest();
        break;
      case 'Highest':
        this.handleSortHighest();
        break;
      case 'Lowest':
        this.handleSortLowest();
        break;
      default:
        this.handleSortRecent();
        break;
    }
  };

  // component to render when there's no search results
  renderNoSearchData = () => (
    <ChecklistPlaceholder>
      <EmptyState
        Icon={EmptyCashflow}
        text={`No search results found. You can try other search terms.`}
      />
    </ChecklistPlaceholder>
  );

  render() {
    const {
      sortedTransactions,
      sortBy,
      itemsForEachPage,
      selectedBanks,
      searchResult,
    } = this.state;
    const hasNoSearchResult = searchResult.length === 0;
    const listToDisplay = hasNoSearchResult ? sortedTransactions : searchResult;

    return (
      <div>
        <BankAccountsContainer>
          {this.props.bankAccounts.map(account => (
            <BankAccountsAccount
              account={account}
              key={account.accountId}
              isActive={selectedBanks.includes(account.accountId)}
              onClick={() => this.handleBankToggling(account.accountId)}
            />
          ))}
        </BankAccountsContainer>
        <TransactionMenu>
          <Form onSubmit={this.handleSubmit}>
            <StyledMagnifyGlass width="36" height="36" />
            <Input
              type="search"
              value={this.state.searchInput}
              onChange={this.handleKeyChange}
              placeholder="Search transactions"
            />
            <ResetButtonContainer
              type="reset"
              onClick={this.handleSearchReset}
              value="Reset"
            >
              <ResetButton>
                <Ex />
              </ResetButton>
            </ResetButtonContainer>
          </Form>
          <TransactionSort>
            <SortButton
              active={sortBy === 'Recent'}
              onClick={this.handleSortRecent}
            >
              Recent
            </SortButton>
            <SortButton
              active={sortBy === 'Oldest'}
              onClick={this.handleSortOldest}
            >
              Oldest
            </SortButton>
            <SortButton
              active={sortBy === 'Highest'}
              onClick={this.handleSortHighest}
            >
              Highest
            </SortButton>
            <SortButton
              active={sortBy === 'Lowest'}
              onClick={this.handleSortLowest}
            >
              Lowest
            </SortButton>
          </TransactionSort>
        </TransactionMenu>
        {itemsForEachPage.length !== 0 ? (
          <div>
            <BankAccountsTransactions
              sortedTransactions={
                itemsForEachPage[this.props.activePageNumberIndex]
              }
            />
            <Pagination list={listToDisplay} />
          </div>
        ) : (
          this.renderNoSearchData()
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activePageNumberIndex:
    state.cashflowTransactions.pagination.activePageNumberIndex,
  itemsPerPage: state.cashflowTransactions.pagination.itemsPerPage,
});

BankAccountsController.propTypes = {
  activePageNumberIndex: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  bankAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(BankAccountsController);
