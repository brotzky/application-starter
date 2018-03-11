import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ease } from 'gac-utils/sc';
import { FadeIn } from '../../ui/transitions/';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { htmlEnDeCode } from 'grow-utils/htmlEnDecoder';
import { EmptyNote, User } from '../../ui/icons/';
import { EmptyState, Button } from '../../ui/components';

const NotesList = styled.ul`
  list-style-type: none;
  margin-bottom: 1.6rem;
`;

const NotesItem = styled.li`
  border-bottom: 1px solid rgba(${props => props.theme.banks.grow.pri}, 0.1);
  &:last-of-type {
    border-bottom: none;
  }
`;

const NotesItemHeader = styled.header`
  flex-wrap: nowrap;
  display: flex;
  padding: 1.6rem 2.4rem;
  color: ${props => props.theme.colors.greyMidDark};
`;

const NotesItemBody = styled.header`
  margin: 0 2.4rem 1.92rem 5.7rem;
  border-radius: 2px;
  position: relative;
  border: 1px solid #eee;
  background: #fafafa;

  p {
    cursor: text;
    white-space: pre-wrap;
    padding: 1.6rem;
    word-wrap: break-word;
    word-break: break-all;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  textarea {
    width: 100%;
    min-height: 150px;
    padding: 1.6rem;
    border: 1px solid #eee;
    margin-bottom: 1.6rem;
    color: ${props => props.theme.colors.black};
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.blue};
    }
  }
  ${props => (props.padding ? 'padding: 1.6rem;' : '')};
`;

const NotesItemHeaderName = styled.header`
  max-width: 490px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;

  span {
    color: ${props => props.theme.colors.blue};
  }
`;
const NotesItemHeaderDate = styled.header`
  flex: 1;
  min-width: 275px;
  text-align: right;
`;
const NotesItemIcon = styled(User)`
  margin-right: 1.2rem;
  vertical-align: bottom;
  * {
    stroke: ${props => props.theme.colors.greyMid};
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  background: none;
  color: ${props => props.theme.colors.blue};
  opacity: 0;
  ${ease('out')};
`;

const SaveButton = styled(Button)`
  margin: 0 1.2rem 0 0;
`;

const CancelButton = styled(Button)`
  margin: 0 4.8rem 0 0;
`;

// Props to Henry for this
const replaceAngleBracketsIfStringContainsAtSymbolNoSemicolon = /<(?!.*;.*)(?:(.*@.*\..*))>/g;

class MemberNotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: '',
    };
    this.filterNotes = this.filterNotes.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(note) {
    this.props.dispatch({ type: 'EDIT_NOTE', payload: note.id });
    this.setState({ noteText: note.content });
  }

  handleSaveClick(note) {
    const updatedNote = Object.assign({}, note, {
      content: this.state.noteText,
    });
    return this.props.handleEditSubmit(updatedNote);
  }

  handleTextareaChange(event) {
    this.setState({
      noteText: event.target.value,
    });
  }

  handleCancelClick() {
    this.props.dispatch({ type: 'EDIT_NOTE', payload: '' });
  }

  filterNotes(note) {
    const { notes } = this.props;
    if (notes.queryParams.category) {
      return notes.queryParams.category === note.category;
    }
    return true;
  }

  renderEmptyState(member, notes, category) {
    const categoryDisplayName =
      category === 'member'
        ? 'General'
        : (category === 'underwriting' && 'Application') ||
          (category === 'product' && 'Product') ||
          (category === 'fraud' && 'Fraud') ||
          '';
    return (
      <EmptyState
        Icon={EmptyNote}
        text={`No ${categoryDisplayName &&
          `${categoryDisplayName} `}notes for ${member.firstName} ${
          member.lastName
        }`}
        errors={notes.errors}
      />
    );
  }

  renderNoPermissionInternalServerError(notes, category = 'All') {
    const categoryDisplayName =
      category === 'member'
        ? 'General'
        : (category === 'underwriting' && 'Application') ||
          (category === 'product' && 'Product') ||
          (category === 'fraud' && 'Fraud') ||
          'All';
    return (
      <EmptyState
        Icon={EmptyNote}
        text={`Cannot view '${categoryDisplayName}' notes because you do not have permission for certain note categories.`}
        errors={notes.errors}
      />
    );
  }

  render() {
    const { member, notes, user, org } = this.props;
    const { errors = [] } = notes;

    return (
      <NotesList>
        <FadeIn>
          {errors.length > 0 &&
            !notes.isFetching &&
            this.renderNoPermissionInternalServerError(
              notes,
              notes.queryParams.category,
            )}
          {!notes.list.length &&
            !notes.isFetching &&
            errors.length === 0 &&
            this.renderEmptyState(member, notes, notes.queryParams.category)}
        </FadeIn>
        {notes.list.filter(this.filterNotes).map(note => {
          const {
            application,
            category,
            creator,
            content,
            dateCreated,
            id,
          } = note;
          const Application =
            application && productApplication(org, application);
          const formattedNoteText = htmlEnDeCode().htmlDecode(
            this.state.noteText.replace(
              replaceAngleBracketsIfStringContainsAtSymbolNoSemicolon,
              '$1',
            ),
          );
          const canEditNote =
            creator && creator.email ? user.email === creator.email : false;

          const categoryDisplayName = (() => {
            if (category === 'underwriting' && application) {
              return (
                <Link to={Application.getWorkbenchLink()}>
                  {' '}
                  Application - {Application.getPrettyName()}
                </Link>
              );
            } else if (category === 'product' && application) {
              return (
                <Link to={Application.getProductLink()}>
                  {' '}
                  Product - {Application.getPrettyName()}
                </Link>
              );
            } else if (category === 'fraud' && application) {
              return (
                <Link to={Application.getProductLink()}>
                  {' '}
                  Fraud - {Application.getPrettyName()}
                </Link>
              );
            }
            return ' General';
          })();

          const dateCreatedMoment = moment(dateCreated);

          return (
            <FadeIn key={id}>
              <NotesItem>
                <NotesItemHeader>
                  <NotesItemIcon />
                  <NotesItemHeaderName>
                    {creator.firstName} {creator.lastName} in
                    <span>{categoryDisplayName}</span>
                  </NotesItemHeaderName>
                  <NotesItemHeaderDate>
                    {dateCreatedMoment.format('MMM D YYYY, h:mm a')} (
                    {dateCreatedMoment.fromNow()}
                    )
                  </NotesItemHeaderDate>
                </NotesItemHeader>
                <NotesItemBody padding={notes.editNoteId === note.id}>
                  {notes.editNoteId === note.id ? (
                    <textarea
                      value={formattedNoteText}
                      autoFocus
                      onChange={this.handleTextareaChange}
                    />
                  ) : canEditNote ? (
                    <p
                      dangerouslySetInnerHTML={{ __html: content }}
                      onClick={() => this.handleEditClick(note)}
                    />
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: content }} />
                  )}
                  {canEditNote &&
                    notes.editNoteId !== note.id && (
                      <EditButton
                        appearance="secondary"
                        text="Edit"
                        onClick={() => this.handleEditClick(note)}
                      />
                    )}
                  {notes.editNoteId === note.id && (
                    <SaveButton
                      appearance="primary"
                      text="Save"
                      onClick={() => this.handleSaveClick(note)}
                    />
                  )}
                  {notes.editNoteId === note.id && (
                    <CancelButton
                      appearance="secondary"
                      text="Cancel"
                      onClick={() => this.handleCancelClick()}
                    />
                  )}
                </NotesItemBody>
              </NotesItem>
            </FadeIn>
          );
        })}
      </NotesList>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(MemberNotesList);
