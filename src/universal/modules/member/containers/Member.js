import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unlockMember } from 'grow-actions/member/member';
import { permissionSelector } from 'gac-utils/selectors';
import styled from 'styled-components';

import AuthWrapper from '../../auth/containers/AuthWrapper';
import MemberProductApplications from './MemberProductApplications';
import MemberNotes from './MemberNotes';
import MemberNoteComposer from './MemberNoteComposer';
import { Button } from '../../ui/components';
import {
  notificationPush,
  notificationEdit,
} from '../../ui/notifications/actions';

const ButtonMarginLeft = styled.span`
  margin-left: 2rem;
`;

class Member extends Component {
  // componentDidMount() {
  //   const { match: { params: { memberId } } } = this.props;

  //   const currentMemberId = this.props.member.member.id;
  //   const currentMemberProfileData = this.props.member.profileData;

  //   if (!currentMemberId || currentMemberId !== memberId) {
  //     return this.fetchData(memberId);
  //   }
  // }

  // componentWillUpdate(nextProps) {
  //   const { match: { params: { prevParams } } } = this.props;
  //   const { matc: { params: { nextParams } } } = nextProps;

  //   const { memberId: prevMemberId } = prevParams;
  //   const { memberId: nextMemberId } = nextParams;

  //   if (prevMemberId !== nextMemberId) {
  //     return this.fetchData(nextMemberId);
  //   }
  // }

  unlockMembersAccount = membersId => {
    const {
      unlockMember,
      notificationPush,
      notificationEdit,
      member,
    } = this.props;

    const { firstName } = member.member;

    notificationPush({
      id: membersId,
      kind: 'loading',
      message: `Unlocking ${firstName}'s account...`,
    });

    unlockMember(membersId).then(({ errors, errorMessage }) => {
      const error = errors && errors.length > 0;
      notificationEdit({
        id: membersId,
        kind: error ? 'error' : 'success',
        message: error
          ? `We can't unlock this account: ${errorMessage}.`
          : `${firstName}'s account is active.`,
        dismissAfter: 5000,
      });
    });
  };

  render() {
    const {
      dispatch,
      member,
      notes,
      user,
      permissions,
      appConfigIsLoaded,
      hasPermission,
    } = this.props;

    return (
      <div className="Member Container">
        {appConfigIsLoaded &&
          member.member.firstName &&
          !member.member.locked && (
            <h2 className="Member__heading">
              {`${member.member.firstName}'s`} account is active.
            </h2>
          )}
        {appConfigIsLoaded &&
          hasPermission &&
          member.member.locked && (
            <h2 className="Member__heading">
              <span>
                {`${member.member.firstName} ${member.member.lastName}'s`}{' '}
                account is locked.
              </span>
              <ButtonMarginLeft>
                <Button
                  text="Unlock"
                  onClick={() => this.unlockMembersAccount(member.member.id)}
                />
              </ButtonMarginLeft>
            </h2>
          )}
        {appConfigIsLoaded && (
          <div className="Member__body">
            <h2 className="Member__heading">About</h2>
            <h2 className="Member__heading">In Progress Applications</h2>
            <MemberProductApplications
              dispatch={dispatch}
              member={member}
              user={user}
            />
            <h2 className="Member__heading">Completed Applications</h2>
            <MemberProductApplications
              dispatch={dispatch}
              member={member}
              products={true}
              user={user}
            />
            <h2 className="Member__heading">Notes</h2>
            <MemberNotes />
          </div>
        )}
        <MemberNoteComposer
          dispatch={dispatch}
          member={member}
          notes={notes}
          permissions={permissions}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member,
  notes: state.notes,
  routing: state.routing,
  user: state.user,
  appConfigIsLoaded: state.configs.app.isLoaded,
  permissions: (state.permissions && state.permissions.permissions) || {},
  hasPermission: permissionSelector(state, 'UNLOCK_MEMBER_ACCOUNT'),
});

export default AuthWrapper(
  connect(mapStateToProps, {
    unlockMember,
    notificationPush,
    notificationEdit,
  })(Member),
);
