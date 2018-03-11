import React from 'react';
import { connect } from 'react-redux';
import { SecondaryNavWrapper, SecondaryNavList } from 'gac-utils/sc';

import SecondaryNavMember from '../components/SecondaryNavMember';
import SecondaryNavApplications from '../components/SecondaryNavApplications';
import SecondaryNavProducts from '../components/SecondaryNavProducts';

const SecondaryNav = props => {
  const { member, auth, params, org } = props;

  return (
    <SecondaryNavWrapper>
      {member.isFetching || auth.isAuthenticating ? null : (
        <SecondaryNavList>
          <SecondaryNavMember member={member} />
          <SecondaryNavApplications member={member} params={params} />
          <SecondaryNavProducts member={member} org={org} />
        </SecondaryNavList>
      )}
    </SecondaryNavWrapper>
  );
};

const mapStateToProps = state => ({
  member: state.member,
  auth: state.auth,
  org: state.auth.organization,
});

export default connect(mapStateToProps)(SecondaryNav);
