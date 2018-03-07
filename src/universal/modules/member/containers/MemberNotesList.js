import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../ui/transitions/';
import { User } from '../../ui/icons/';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { htmlEnDeCode } from 'grow-utils/htmlEnDecoder';
import { EmptyNote } from '../../ui/icons/';
import { EmptyState } from '../../ui/components';

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
      <ul className="MemberNotesList">
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
              <li className="MemberNotesItem">
                <header className="MemberNotesItem__header">
                  <User className="MemberNotesItem__icon" />
                  <div className="MemberNotesItem__header-name">
                    {creator.firstName} {creator.lastName} in
                    <span>{categoryDisplayName}</span>
                  </div>
                  <span className="MemberNotesItem__header-date">
                    {dateCreatedMoment.format('MMM D YYYY, h:mm a')} (
                    {dateCreatedMoment.fromNow()}
                    )
                  </span>
                </header>
                <div
                  className={`MemberNotesItem__body ${
                    notes.editNoteId === note.id
                      ? 'MemberNotesItem__body--padded'
                      : ''
                  }`}
                >
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
                      <button
                        onClick={() => this.handleEditClick(note)}
                        className="MemberNotesItem__edit-button"
                      >
                        Edit
                      </button>
                    )}
                  {notes.editNoteId === note.id && (
                    <button
                      onClick={() => this.handleSaveClick(note)}
                      className="MemberNotesItem__save-button"
                    >
                      <span>Save</span>
                    </button>
                  )}
                  {notes.editNoteId === note.id && (
                    <button
                      onClick={() => this.handleCancelClick()}
                      className="MemberNotesItem__cancel-button"
                    >
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </li>
            </FadeIn>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(MemberNotesList);
