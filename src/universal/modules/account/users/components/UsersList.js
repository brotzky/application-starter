import React, { Component } from 'react';
import { usersPropType, isFetchingPropType } from 'gac-utils/proptypes';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UsersItem from './UsersItem';
import UsersListPlaceholder from './UsersListPlaceholder';
import UsersPagination from './UsersPagination';
import EmptyUserRoleList from '../../../ui/UserRolesList/EmptyList';

// A hack to hide the last border bottom;
const UserItemContainer = styled.div`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background: #fff;
  }
`;

const EmptyUserRoleListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UsersListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;
`;

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSort: 'firstName', // same field name as the users array in redux
      sortedList: this.props.users, // ascending order
    };
  }

  componentDidMount() {
    this.sortUserList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) this.sortUserList();
  }

  sortUserList = () => {
    const { activeSort } = this.state;
    const { users } = this.props;

    const usersClone = users.slice();

    usersClone.sort((a, b) => {
      const userA = a[activeSort];
      const userB = b[activeSort];
      return userA < userB ? -1 : 1;
    });
    this.setState({ sortedList: usersClone });
  };

  generateRenderedUsers = () => {
    const { currentPage, dispatch, users } = this.props;
    const { sortedList } = this.state;
    const start = currentPage === 1 ? 0 : currentPage * 10 - 10;
    const end = currentPage * 10;
    const pagesSumm = Math.ceil(users.length / 10);

    // If there are no users show empty state
    if (sortedList.length < 1) {
      return (
        <EmptyUserRoleListContainer>
          <EmptyUserRoleList text="No users found. Try a different search term." />
        </EmptyUserRoleListContainer>
      );
    }
    return (
      <div>
        <UsersPagination
          currentPage={currentPage}
          change={change}
          dispatch={dispatch}
          pagesSumm={pagesSumm}
        />
        <UserItemContainer>
          {sortedList
            .slice(start, end)
            .map(user => <UsersItem user={user} key={user.id} />)}
        </UserItemContainer>
        <UsersPagination
          currentPage={currentPage}
          change={change}
          dispatch={dispatch}
          pagesSumm={pagesSumm}
        />
      </div>
    );
  };

  render() {
    return (
      <UsersListContainer>
        {this.props.isFetching ? (
          <UsersListPlaceholder />
        ) : (
          this.generateRenderedUsers()
        )}
      </UsersListContainer>
    );
  }
}

UsersList.propTypes = {
  users: usersPropType.isRequired,
  isFetching: isFetchingPropType.isRequired,
};

UsersList = reduxForm({
  form: 'users-pagination',
  initialValues: {
    page: 1,
  },
})(UsersList);

const selector = formValueSelector('users-pagination');

const mapStateToProps = state => ({
  currentPage: selector(state, 'page'),
});

export default connect(mapStateToProps)(UsersList);
