import React, { Component } from 'react';
import styled from 'styled-components';
import { EditorState, ContentState } from 'draft-js';

import TranslationCompDecorator, {
  customStyles,
} from './TranslationCompositeDecorator';
import TextEditor from './TextEditor';
import ViewPermission from '../../../ui/components/Permissions/ViewPermission';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  width: 100%;
  align-items: center;
  min-height: 24px;
  margin-bottom: 1rem;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.45);
  position: relative;
`;

const ActionButtonToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
`;

const ActionButton = styled.button`
  border-radius: 3px;
  border: none;
  padding: 1rem;
  font-size: 1.3rem;
`;

const Title = styled.div`
  flex: 30%;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.5rem;
  flex: 70%;
  cursor: pointer;
`;

class Definition extends Component {
  state = {
    editing: false,
    showActions: false,
    title: this.props.title,
    text: this.props.text,
  };
  onEnter = () => this.setState({ showActions: true });
  onLeave = () => this.setState({ showActions: false });
  onSave = value => {
    this.props.onSave({
      path: `${this.props.category}.${this.props.title}`,
      value,
    });
    this.setState({
      editing: false,
      text: value,
    });
  };
  render() {
    const { editing, showActions, title, text } = this.state;
    const { parent, category, onDelete } = this.props;
    return (
      <Wrapper onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
        <Title>{title}</Title>
        {editing ? (
          <TextEditor
            editorRef={el => {
              this.editor = el;
            }}
            editorState={EditorState.createWithContent(
              ContentState.createFromText(text),
              TranslationCompDecorator,
            )}
            showSave
            onSave={this.onSave}
            customStyles={customStyles}
          />
        ) : (
          <Text
            onDoubleClick={() => !editing && this.setState({ editing: true })}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        {showActions && (
          <ViewPermission permission="EDIT_TRANSLATIONS">
            <ActionButtonToolbar>
              <ActionButton
                onClick={() =>
                  onDelete(
                    parent
                      ? `${category}.${parent}.${title}`
                      : `${category}.${title}`,
                  )
                }
              >
                Delete
              </ActionButton>
            </ActionButtonToolbar>
          </ViewPermission>
        )}
      </Wrapper>
    );
  }
}

export default Definition;
