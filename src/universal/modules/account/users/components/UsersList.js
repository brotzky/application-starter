import React, { PureComponent } from 'react';
import { usersPropType, isFetchingPropType } from 'gac-utils/proptypes';
import UsersListHeader from './UsersListHeader';
import UsersItem from './UsersItem';
import UsersListPlaceholder from './UsersListPlaceholder';
import EmptyUserRoleList from '../../../ui/UserRolesList/EmptyList';

const buildUserList = (users, activeSort, sortByAsc) => {
  // If there are no users show empty state

  if (users.length < 1) {
    return (
      <EmptyUserRoleList text="No users found. Try a different search term." />
    );
  }

  users.sort((a, b) => {
    const userA = a[activeSort];
    const userB = b[activeSort];
    if (sortByAsc) {
      if (userA < userB) return -1;
      if (userA > userB) return 1;
    } else {
      if (userA < userB) return 1;
      if (userA > userB) return -1;
    }
    return 0;
  });

  return (
    <tbody>{users.map(user => <UsersItem user={user} key={user.id} />)}</tbody>
  );
};

class UsersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSort: 'firstName', // same field name as the users array in redux
      sortByAsc: true, // ascending === true | descending === false
    };
  }

  handleSortClick = event => {
    const { activeSort, sortByAsc } = this.state;
    // Need this to make entire header area clickable including SVG. Checks for the heading data-sortname
    const clickedHeader = event.target
      .closest('th')
      .firstChild.getAttribute('data-sortname');

    this.setState({
      activeSort: clickedHeader,
      sortByAsc: activeSort === clickedHeader ? !sortByAsc : true,
    });
  };

  render() {
    const { users, isFetching } = this.props;
    const { activeSort, sortByAsc } = this.state;

    return (
      <table className="UsersListContainer">
        <UsersListHeader
          activeSort={activeSort}
          handleClick={this.handleSortClick}
          sortByAsc={sortByAsc}
        />
        {isFetching ? (
          <UsersListPlaceholder />
        ) : (
          buildUserList(users, activeSort, sortByAsc)
        )}
      </table>
    );
  }
}

UsersList.propTypes = {
  users: usersPropType.isRequired,
  isFetching: isFetchingPropType.isRequired,
};

export default UsersList;
