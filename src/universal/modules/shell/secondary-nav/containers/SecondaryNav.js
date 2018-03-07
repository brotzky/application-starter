import React from 'react';
import { connect } from 'react-redux';

import SecondaryNavMember from '../components/SecondaryNavMember';
import SecondaryNavApplications from '../components/SecondaryNavApplications';
import SecondaryNavProducts from '../components/SecondaryNavProducts';

const SecondaryNav = props => {
  const { member, auth, params, org } = props;

  return (
    <div className="SecondaryNav">
      {member.isFetching || auth.isAuthenticating ? null : (
        <ul className="SecondaryNavList">
          <SecondaryNavMember member={member} />
          <SecondaryNavApplications member={member} params={params} />
          <SecondaryNavProducts member={member} org={org} />
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  member: state.member,
  auth: state.auth,
  org: state.auth.organization,
});

export default connect(mapStateToProps)(SecondaryNav);
