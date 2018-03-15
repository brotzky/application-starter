import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import fuse from 'fuse.js';
import { rolesPropType, isFetchingRolePropType } from 'gac-utils/proptypes';
import { Button, Card, Title } from '../../../ui/components';
import AccountShellWrapper from '../../shell/containers/AccountShellWrapper';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import RolesSearch from './RolesSearch';
import RolesList from '../components/RolesList';

class Roles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredRoles: this.props.roles,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { searchValues } = nextProps;
    const searchText = searchValues[searchValues.searchBy];

    // Only update filteredRoles if there is inputed search text
    if (searchText) {
      const fuseInstance = new fuse(this.props.roles, {
        distance: 50,
        keys: ['name', 'description'],
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.4,
      });

      this.setState({ filteredRoles: fuseInstance.search(searchText) });
    } else {
      this.setState({ filteredRoles: nextProps.roles });
    }
  }

  render() {
    const { dispatch, isFetchingRole } = this.props;

    return (
      <Card>
        <Title title="Roles" />
        <AccountShellSection padding>
          <AccountShellHeader
            text="Roles"
            action={
              <Button
                onClick={() => dispatch(push('/account/roles/create'))}
                text="Create role"
                permission="EDIT_ROLE"
                appearance="default"
                size="large"
              />
            }
          />
          <RolesSearch />
          <RolesList
            isFetchingRole={isFetchingRole}
            roles={this.state.filteredRoles}
          />
        </AccountShellSection>
      </Card>
    );
  }
}

Roles.propTypes = {
  roles: rolesPropType.isRequired,
  isFetchingRole: isFetchingRolePropType.isRequired,
};

const mapStateToProps = state => ({
  roles: state.users.roles,
  searchValues:
    (state.form['search-roles'] && state.form['search-roles'].values) || {},
  isFetchingRole: state.users.isFetchingRole,
});

export default AccountShellWrapper(connect(mapStateToProps)(Roles));
