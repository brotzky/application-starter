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
  background: #f9f9f9;
  min-height: 100vh;
`;
class Shell extends Component {
  /**
   * getChildContext()
   * Specific React Router syntax to allow easy passing of React Router props
   * to children components.
   * Example: http://stackoverflow.com/a/37523743/3845614
   */
  getChildContext() {
    return {
      routes: this.props.routes,
      params: this.props.params,
    };
  }

  componentDidMount() {
    const { dispatch, member, match } = this.props;

    /**
     * The Shell is responsible for making Global member calls if there is a
     * memberId paramter in the URL.
     */
    if (!member.member.id || member.member.id !== match.params.memberId) {
      if (match.params.memberId) {
        dispatch(getMember(match.params.memberId));
      }
    }
  }

  componentWillUpdate(nextProps) {
    const { dispatch, match, members } = this.props;
    if (
      nextProps.match.params.memberId &&
      nextProps.match.params.memberId !== match.params.memberId
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
    const { children, params } = this.props;

    // Quick workaround to hide secondary nav on the applications page
    return (
      <ShellContainer>
        <PrimaryNav params={params} />
        {/* <SecondaryNav params={params} /> */}
        <Dynamic>{children}</Dynamic>
      </ShellContainer>
    );
  }
}

Shell.childContextTypes = {
  routes: PropTypes.array,
  params: PropTypes.object,
};

const mapStateToProps = state => ({
  member: state.member,
  members: state.members,
});

export default connect(mapStateToProps)(Shell);
