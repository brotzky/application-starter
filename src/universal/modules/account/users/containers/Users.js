import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getUsers } from 'grow-actions/user/user';
import { Card, EmptyState, Button } from '../../../ui/components';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import AccountShellWrapper from '../../shell/containers/AccountShellWrapper';
import UsersList from '../components/UsersList';
import UsersSearch from './UsersSearch';
import fuse from 'fuse.js';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredUsers: this.props.users.users,
    };
  }
  componentDidMount() {
    const { users, dispatch } = this.props;
    if (!users.users.length) {
      return dispatch(getUsers());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { searchValues } = nextProps;
    let searchText = searchValues[searchValues.searchBy];

    // If it's name, we have to combine first and last name search values
    if (searchValues.searchBy === 'name') {
      searchText = `${searchValues.firstName} ${searchValues.lastName}`;
    }

    // Only update filteredUsers if there is inputed search text
    if (searchText) {
      const fuseInstance = new fuse(this.props.users.users, {
        distance: 50,
        keys: ['firstName', 'lastName', 'email', 'role'],
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.4,
      });

      this.setState({ filteredUsers: fuseInstance.search(searchText) });
    } else {
      // Update to have new users on initial render
      this.setState({ filteredUsers: nextProps.users.users });
    }
  }

  render() {
    const { dispatch, users: { isFetching, errors }, permissions } = this.props;

    return (
      <Card>
        <AccountShellSection padding>
          <AccountShellHeader
            text="Users"
            action={
              <Button
                onClick={() => dispatch(push('/account/users/create'))}
                text="Create user"
                permission="EDIT_ADMINISTRATOR"
                appearance="default"
                size="large"
              />
            }
          />
          <UsersSearch />
          {errors.includes('NO_PERMISSION') ? (
            <EmptyState errors={errors} />
          ) : (
            <UsersList
              users={this.state.filteredUsers}
              isFetching={isFetching}
              permissions={permissions}
              dispatch={dispatch}
            />
          )}
        </AccountShellSection>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  searchValues: state.form['search-users'] && state.form['search-users'].values,
  permissions: (state.permissions && state.permissions.permissions) || {},
});

export default AccountShellWrapper(connect(mapStateToProps)(Users));
