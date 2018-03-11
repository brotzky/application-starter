import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { getRole } from 'grow-actions/roles/roles';
import styled from 'styled-components';
import {
  isFetchingRolePropType,
  rolePropType,
  permissionsPropType,
} from 'gac-utils/proptypes';
import { Card } from '../../../ui/components';
import buildPermissionsConfig from '../../utils/buildPermissionsConfig';
import RoleFormPlaceholder from '../components/RoleFormPlaceholder';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellCreateSection from '../../shell/components/AccountShellCreateSection';
import RolesCreateNameForm from '../../roles/components/RolesCreateNameForm';
import RolesCreateForm from '../../roles/components/RolesCreateForm';
import RolesCreateFormSubmit from '../../roles/components/RolesCreateFormSubmit';
import { FadeIn } from '../../../ui/transitions/';

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 3.375rem;
`;

const ProfileCard = styled(Card)`
  flex: 0.6;
  padding: 2.4rem;
`;

class Role extends Component {
  state = {
    initialValues: {},
  };

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getRole(params.accountSecondaryTab)).then(res => {
      if (res.payload.data) {
        this.handleInitializeForm(res.payload.data);
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'RESET_ROLE' });
  }

  /**
   * handleInitializeForm()
   *
   * Takes in the roles object returned form backed on getRole() action and formats
   * it for redux-forms specific way. This will initialize the form properly
   *
   * @memberof Role
   */
  handleInitializeForm = role => {
    const { description, name } = role;
    const permissions = {};

    for (const key of role.permissions) {
      permissions[key] = true;
    }

    const initialValues = {
      name,
      description,
      permissions,
    };

    this.props.dispatch(initialize('create-role', initialValues));

    // Setting state to have the initial values so we know to render the form
    this.setState({ initialValues });
  };

  render() {
    const { isFetchingRole, role, permissions } = this.props;
    const roleName = isFetchingRole ? 'Loading...' : `${role.name}`;

    return (
      <AccountShellSection>
        <AccountShellHeader
          linkBack={{ link: '/account/roles', text: 'Roles' }}
          text={roleName}
          padding
        />

        {!this.state.initialValues.name && !permissions.length ? (
          <RoleFormPlaceholder />
        ) : (
          <FadeIn>
            <AccountShellCreateSection header="Role information">
              <ProfileCard>
                <RolesCreateNameForm />
              </ProfileCard>
            </AccountShellCreateSection>
            {/**
             * Loop over all the permissionConfigs[] defined on Frontend and
             * create a form that can be updated or created.
             */}
            {buildPermissionsConfig(permissions).map(perm => (
              <AccountShellCreateSection header={perm.name}>
                <ProfileCard>
                  <RolesCreateForm permissions={perm.permissions} />
                </ProfileCard>
              </AccountShellCreateSection>
            ))}
            <ButtonRow>
              <RolesCreateFormSubmit
                roleId={role.id}
                buttonText="Delete Role"
              />
              <RolesCreateFormSubmit buttonText="Update Role" />
            </ButtonRow>
          </FadeIn>
        )}
      </AccountShellSection>
    );
  }
}

Role.propTypes = {
  isFetchingRole: isFetchingRolePropType.isRequired,
  role: rolePropType.isRequired,
  permissions: permissionsPropType.isRequired,
};

const mapStateToProps = state => ({
  role: state.users.role,
  isFetchingRole: state.users.isFetchingRole,
  permissions: state.users.permissions,
});

export default connect(mapStateToProps)(Role);
