import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { createNote } from 'grow-actions/member/member';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import { permissionSelector } from 'gac-utils/selectors';
import {
  TOGGLE_NOTE_COMPOSER,
  updateMemberState,
} from '../actions/actions-update-member-state';
import NoteForm from '../../forms/forms/Note';
import { notificationPush } from '../../ui/notifications/actions/';
import { Fab } from '../../ui/components';
import { Pencil, PencilPaper, Remove } from '../../ui/icons/';
import { Transition } from '../../ui/transitions/';

class MemberNoteComposer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFabClick = this.handleFabClick.bind(this);
  }

  componentWillMount() {
    this.setCategoryValue();
  }

  componentWillUpdate(nextProps) {
    const {
      member: { showNoteComposer: prevShowNoteComposer },
      params: nextParams = {},
    } = nextProps;
    const {
      member: { showNoteComposer: nextShowNoteComposer },
      params: prevParams = {},
    } = this.props;

    if (
      prevShowNoteComposer !== nextShowNoteComposer ||
      nextParams.workbenchId !== prevParams.workbenchId ||
      nextParams.productId !== prevParams.productId
    ) {
      return this.setCategoryValue(nextProps);
    }
  }

  setCategoryValue(props = this.props) {
    const { category, dispatch, params } = props;
    if (category) {
      return dispatch(initialize('note', { category }));
    }

    if (params && params.workbenchId) {
      return dispatch(
        initialize('note', { category: `underwriting%${params.workbenchId}` }),
      );
    } else if (params && params.productId) {
      return dispatch(
        initialize('note', { category: `product%${params.productId}` }),
      );
    }
    return dispatch(initialize('note', { category: 'member' }));
  }

  handleSubmit(data) {
    if (!data.content) {
      return null;
    }
    const { dispatch, member } = this.props;
    const categorySplit = data.category.split('%');
    const body = {
      category: categorySplit[0],
      content: data.content,
    };

    if (categorySplit[1]) {
      body.applicationId = categorySplit[1];
    }

    return dispatch(createNote(member.member.id, body)).then(response => {
      if (!response.error) {
        this.handleFabClick();
      }
      dispatch(
        notificationPush({
          dismissAfter: 3000,
          kind: response.error ? 'error' : 'success',
          message: response.error ? 'Unable to add note' : 'Note added',
        }),
      );
    });
  }

  handleFabClick() {
    const { dispatch, member } = this.props;
    return dispatch(
      updateMemberState(TOGGLE_NOTE_COMPOSER, !member.showNoteComposer),
    );
  }

  render() {
    const { member, params, hasPermission } = this.props;
    const { productApplications, showNoteComposer } = member;

    return (
      <div
        className={`MemberNoteComposer ${addClassNameIf(
          showNoteComposer,
          'MemberNoteComposer--active',
        )}`}
      >
        <Transition transitionName="MemberNoteComposer">
          {showNoteComposer === true && (
            <div className="Member__box MemberNoteComposer__body">
              <header className="MemberNoteComposer__header">
                <PencilPaper className="MemberNoteComposer__header-icon" />
                <strong>
                  Add Note for {member.member.firstName}{' '}
                  {member.member.lastName}
                </strong>
              </header>
              <NoteForm
                params={params}
                productApplications={productApplications}
                onSubmit={this.handleSubmit}
              />
            </div>
          )}
        </Transition>

        {hasPermission ? (
          <Fab
            title="Add note"
            className="MemberNoteComposer__fab"
            handleClick={this.handleFabClick}
          >
            {showNoteComposer ? (
              <Remove className="MemberNoteComposer__fab-icon MemberNoteComposer__fab-icon--path" />
            ) : (
              <Pencil className="MemberNoteComposer__fab-icon MemberNoteComposer__fab-icon--stroke" />
            )}
          </Fab>
        ) : (
          <Fab
            title="Add note"
            className="PermissionRequired MemberNoteComposer__fab"
          >
            <Pencil className="MemberNoteComposer__fab-icon MemberNoteComposer__fab-icon--stroke" />
          </Fab>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasPermission: permissionSelector(state, 'EDIT_MEMBER_NOTE'),
});

export default connect(mapStateToProps)(MemberNoteComposer);
