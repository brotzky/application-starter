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

const MemberContainer = styled.div`
  padding: 3.5rem 8rem;
  max-width: 1270px;
  margin: 0 auto;
`;

const MemberHeading = styled.h2`
  margin: 1.92rem 0 0.8rem;
  font-size: 2rem;
`;
class Member extends Component {
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
      <MemberContainer>
        {appConfigIsLoaded &&
          member.member.firstName &&
          !member.member.locked && (
            <MemberHeading>
              {`${member.member.firstName}'s`} account is active.
            </MemberHeading>
          )}
        {appConfigIsLoaded &&
          hasPermission &&
          member.member.locked && (
            <MemberHeading>
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
            </MemberHeading>
          )}
        {appConfigIsLoaded && (
          <div>
            <MemberHeading>About</MemberHeading>
            <MemberHeading>In Progress Applications</MemberHeading>
            <MemberProductApplications
              dispatch={dispatch}
              member={member}
              user={user}
            />
            <MemberHeading>Completed Applications</MemberHeading>
            <MemberProductApplications
              dispatch={dispatch}
              member={member}
              products={true}
              user={user}
            />
            <MemberHeading>Notes</MemberHeading>
            <MemberNotes />
          </div>
        )}
        <MemberNoteComposer
          dispatch={dispatch}
          member={member}
          notes={notes}
          permissions={permissions}
        />
      </MemberContainer>
    );
  }
}

Member.contextTypes = {
  params: PropTypes.object,
};

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
