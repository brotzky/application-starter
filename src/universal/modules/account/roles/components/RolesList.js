import React, { PureComponent } from 'react';
import { rolesPropType, isFetchingRolePropType } from 'gac-utils/proptypes';
import RolesListHeader from './RolesListHeader';
import RolesItem from './RolesItem';
import UsersListPlaceholder from '../../users/components/UsersListPlaceholder';
import EmptyUserRoleList from '../../../ui/UserRolesList/EmptyList';

const buildUserList = (roles, activeSort, sortByAsc) => {
  // If there are no users show empty state
  if (roles.length < 1) {
    return (
      <EmptyUserRoleList text="No roles found. Try a different search term." />
    );
  }

  roles.sort((a, b) => {
    const roleA = a[activeSort];
    const roleB = b[activeSort];
    if (sortByAsc) {
      if (roleA < roleB) return -1;
      if (roleA > roleB) return 1;
    } else {
      if (roleA < roleB) return 1;
      if (roleA > roleB) return -1;
    }
    return 0;
  });

  return (
    <tbody>{roles.map(role => <RolesItem role={role} key={role.id} />)}</tbody>
  );
};

class RolesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSort: 'name', // same field name as the roles array in redux
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
    const { roles, isFetchingRole } = this.props;
    const { activeSort, sortByAsc } = this.state;

    return (
      <table className="UsersListContainer">
        <RolesListHeader
          activeSort={activeSort}
          handleClick={this.handleSortClick}
          sortByAsc={sortByAsc}
        />
        {isFetchingRole ? (
          <UsersListPlaceholder />
        ) : (
          buildUserList(roles, activeSort, sortByAsc)
        )}
      </table>
    );
  }
}

RolesList.propTypes = {
  roles: rolesPropType.isRequired,
  isFetchingRole: isFetchingRolePropType.isRequired,
};

export default RolesList;
