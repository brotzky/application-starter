import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import styled from 'styled-components';
import { ease, colors } from 'gac-utils/sc';
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

const StyledFab = styled(Fab)`
  margin: 0 0 0 auto;
  transform: rotate(0);
  ${ease('out')};
`;

const NoteComposerWrapper = styled.div`
  $p: &;
  position: fixed;
  z-index: 10;
  bottom: ${props => `${props.theme.space}rem`};
  right: ${props => `${props.theme.space}rem`};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MemberComposerBody = styled.div`
  min-height: 400px;
  width: 396px;
  margin-bottom: ${props => `${props.theme.space / 1.5}rem`};
  overflow: hidden;
  transform-origin: 90% bottom;
  background: white;
  border-radius: 3px;
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),
    0 4px 8px -2px rgba(9, 30, 66, 0.25);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1.6rem 1.2rem;
  background: white;
  color: ${props => props.theme.colors.black};
`;

const HeaderIcon = styled(PencilPaper)`
  margin-right: 1.2rem;
  * {
    stroke: ${props => props.theme.colors.black};
  }
`;

const StyledRemove = styled(Remove)`
  * {
    fill: white;
  }
`;
const StyledPencil = styled(Pencil)`
  * {
    stroke: white;
  }
`;

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
      <NoteComposerWrapper>
        <Transition transitionName="MemberNoteComposer">
          {showNoteComposer === true && (
            <MemberComposerBody>
              <Header>
                <HeaderIcon />
                <strong>
                  Add Note for {member.member.firstName}{' '}
                  {member.member.lastName}
                </strong>
              </Header>
              <NoteForm
                params={params}
                productApplications={productApplications}
                onSubmit={this.handleSubmit}
              />
            </MemberComposerBody>
          )}
        </Transition>

        {hasPermission ? (
          <StyledFab title="Add note" handleClick={this.handleFabClick}>
            {showNoteComposer ? <StyledRemove /> : <StyledPencil />}
          </StyledFab>
        ) : (
          <StyledFab>
            <StyledPencil />
          </StyledFab>
        )}
      </NoteComposerWrapper>
    );
  }
}

const mapStateToProps = state => ({
  hasPermission: permissionSelector(state, 'EDIT_MEMBER_NOTE'),
});

export default connect(mapStateToProps)(MemberNoteComposer);
