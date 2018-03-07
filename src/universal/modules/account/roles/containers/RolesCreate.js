import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '../../../ui/components';
import buildPermissionsConfig from '../../utils/buildPermissionsConfig';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellCreateSection from '../../shell/components/AccountShellCreateSection';
import RolesCreateNameForm from '../components/RolesCreateNameForm';
import RolesCreateForm from '../components/RolesCreateForm';
import RolesCreateFormSubmit from '../components/RolesCreateFormSubmit';

const ProfileCard = styled(Card)`
  flex: 0.6;
  padding: 2.4rem;
`;

/**
 * @class RolesCreate
 * @extends {Component}
 */
const RolesCreate = props => {
  const { permissions } = props;
  const permissionsConfig = buildPermissionsConfig(permissions);

  return (
    <AccountShellSection>
      <AccountShellHeader
        linkBack={{ link: '/account/roles', text: 'Roles' }}
        text="Create Role"
        padding
      />
      <AccountShellCreateSection header="Role information">
        <ProfileCard>
          <RolesCreateNameForm />
        </ProfileCard>
      </AccountShellCreateSection>
      {/**
        * Loop over all the permissionConfigs[] defined on Frontend and
        * create a form that can be updated or created.
        */}
      {permissionsConfig.map(perm => (
        <AccountShellCreateSection
          header={perm.name}
          text={perm.text}
          key={perm.name}
        >
          <ProfileCard>
            <RolesCreateForm permissions={perm.permissions} />
          </ProfileCard>
        </AccountShellCreateSection>
      ))}
      <RolesCreateFormSubmit />
    </AccountShellSection>
  );
};

RolesCreate.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  permissions: state.users.permissions,
});

export default connect(mapStateToProps)(RolesCreate);
