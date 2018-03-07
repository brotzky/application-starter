import React from 'react';
import styled from 'styled-components';
import AccountShellWrapper from '../../shell/containers/AccountShellWrapper';
import AccountShellHeader from '../../shell/components/AccountShellHeader';
import AccountShellSection from '../../shell/components/AccountShellSection';
import AccountShellCreateSection from '../../shell/components/AccountShellCreateSection';
import UsersCreatePersonalFormWrapper from '../components/UsersCreatePersonalForm';
import UsersCreateSubmitForm from '../components/UsersCreateSubmitForm';
import { Card } from '../../../ui/components';

const ProfileCard = styled(Card)`
  flex: 0.6;
  padding: 2.4rem;
`;

const UsersCreate = () => (
  <AccountShellSection>
    <AccountShellHeader
      linkBack={{ link: '/account/users', text: 'Users' }}
      text="Create User"
      padding
    />
    <AccountShellCreateSection
      header="Account information"
      text="Creating a new user will send them an email invite to setup their new account."
    >
      <ProfileCard>
        <UsersCreatePersonalFormWrapper isCreateUserForm />
      </ProfileCard>
    </AccountShellCreateSection>
    <div className="UsersCreateSectionSubmit">
      <UsersCreateSubmitForm />
    </div>
  </AccountShellSection>
);

export default AccountShellWrapper(UsersCreate);