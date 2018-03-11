import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearfix, bButton } from 'gac-utils/sc';
import { getNotes, updateNote } from 'grow-actions/member/member';
import Pagination from '../../ui/pagination/containers/Pagination';
import {
  TOGGLE_NOTE_COMPOSER,
  updateMemberState,
} from '../actions/actions-update-member-state';
import MemberNotesList from './MemberNotesList';
import MemberNotesHeader from './MemberNotesHeader';
import MemberNotesPlaceholder from '../components/MemberNotesPlaceholder';
import {
  notificationEdit,
  notificationPush,
} from '../../ui/notifications/actions/';
import { FadeIn } from '../../ui/transitions/';

const Wrapper = styled.div`
  ${clearfix};
  background: white;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
`;

const MemberNotesMore = styled.div`
  margin-bottom: 2.4rem;
  padding: 0 3rem;
  text-align: center;
`;

const MemberNotesMoreBtn = styled.button`
  ${bButton};
  background: ${props => props.theme.colors.blue};
`;
class MemberNotes extends Component {
  constructor(props) {
    super(props);
    this.handleAddNoteClick = this.handleAddNoteClick.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleLessClick = this.handleLessClick.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    const { member, updateData, defaultCategory = '' } = this.props;

    if (member.member.id) {
      return updateData({ queryParams: { defaultCategory } }, member.member.id);
    }
  }

  componentWillUpdate(nextProps) {
    const {
      defaultCategory: category,
      member: nextMember,
      memberId: nextMemberId,
      updateData,
    } = nextProps;
    const { member: prevMember, memberId: prevMemberId } = this.props;
    if (nextMember.member.id !== prevMember.member.id && nextMember.member.id) {
      return updateData({ queryParams: { category } }, nextMember.member.id);
    }
  }

  handleMoreClick() {
    const { data: notes, member, updateData } = this.props;
    return updateData(
      {
        queryParams: {
          start: 0,
          end: notes.queryParams.end + 3 || 6,
        },
      },
      member.member.id,
    );
  }

  handleLessClick() {
    const { member, updateData } = this.props;
    return updateData(
      {
        queryParams: {
          start: 0,
          end: 3,
        },
      },
      member.member.id,
    );
  }

  handleAddNoteClick() {
    const { dispatch } = this.props;
    dispatch(updateMemberState(TOGGLE_NOTE_COMPOSER, true));
  }

  handleEditSubmit(note) {
    const { dispatch, member: { member } } = this.props;
    dispatch(
      notificationPush({
        id: note.id,
        kind: 'loading',
        message: 'Saving changes',
      }),
    );
    return dispatch(updateNote(member.id, note.id, note)).then(response => {
      dispatch(
        notificationEdit({
          dismissAfter: 3000,
          id: note.id,
          kind: response.error ? 'error' : 'success',
          message: response.error ? 'Unable to save changes' : 'Changes saved',
        }),
      );
    });
  }

  render() {
    const { data: notes, dispatch, member, updateData, user } = this.props;
    return (
      <Wrapper>
        <MemberNotesHeader
          handleAddNoteClick={this.handleAddNoteClick}
          member={member}
          notes={notes}
          updateData={updateData}
        />
        <div>
          <FadeIn>
            {notes.isFetching ? (
              <MemberNotesPlaceholder />
            ) : (
              (member.member.id && (
                <MemberNotesList
                  dispatch={dispatch}
                  handleEditSubmit={this.handleEditSubmit}
                  member={member.member}
                  notes={notes}
                  user={user}
                />
              )) ||
              null
            )}
          </FadeIn>
          {notes.list.length > 3 ? (
            <MemberNotesMore>
              <MemberNotesMoreBtn
                disabled={notes.isFetching}
                type="button"
                onClick={this.handleLessClick}
              >
                <span>Less</span>
              </MemberNotesMoreBtn>
            </MemberNotesMore>
          ) : null}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.notes,
  member: state.member,
  user: state.user,
});

MemberNotes = Pagination({
  fetchDataAction: getNotes,
  name: 'notes',
})(MemberNotes);

export default connect(mapStateToProps)(MemberNotes);
