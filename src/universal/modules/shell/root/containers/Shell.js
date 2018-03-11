import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PrimaryNav from '../../primary-nav/containers/PrimaryNav';
import SecondaryNav from '../../secondary-nav/containers/SecondaryNav';
import Dynamic from '../../dynamic/components/Dynamic';
import { getMember } from 'grow-actions/member/member';
import { SYNC_MEMBER_FROM_MEMORY_REQUEST } from 'grow-actions/member/constants';

const ShellContainer = styled.div`
  background: ${props => props.theme.colors.greyBg};
  min-height: 100vh;
`;
class Shell extends Component {
  componentDidMount() {
    const { dispatch, member, match: { params }, roles } = this.props;

    /**
     * The Shell is responsible for making Global member calls if there is a
     * memberId paramter in the URL.
     */
    if (!member.member.id || member.member.id !== params.memberId) {
      if (params.memberId) {
        dispatch(getMember(params.memberId));
      }
    }
  }

  componentWillUpdate(nextProps) {
    const { dispatch, match: { params }, members } = this.props;
    if (
      nextProps.match.params.memberId &&
      nextProps.match.params.memberId !== params.memberId
    ) {
      if (members.loaded[nextProps.match.params.memberId]) {
        return dispatch({
          type: SYNC_MEMBER_FROM_MEMORY_REQUEST,
          payload: nextProps.match.params.memberId,
        });
      }
      return dispatch(getMember(nextProps.match.params.memberId));
    }

    return null;
  }

  render() {
    const { match: { params }, pathname } = this.props;

    return (
      <ShellContainer>
        <PrimaryNav params={params} />
        {(pathname.includes('members') || pathname.includes('analytics')) && (
          <SecondaryNav params={params} />
        )}
        <Dynamic>{this.props.children}</Dynamic>
      </ShellContainer>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member,
  members: state.members,
  roles: state.users.roles,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Shell);
