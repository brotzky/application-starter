import React, { Component } from 'react';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import EditorToolbar from './EditorToolbar';

const EditorWrapper = styled.div`
  border: ${props => (props.inverse ? 'none' : '1px solid #2d2d2d')};
  background-color: ${props => (props.inverse ? '#f2f2f2' : 'transparent')};
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  min-height: 38px;
  flex: ${props => (props.fullWidth ? '100%' : '70%')};
  width: ${props => (props.fullWidth ? '100%' : '70%')};
  ::placeholder {
    color: #959595;
  }
  font-size: 1.6rem;
  border-radius: 3px;
  margin-top: 1rem;
`;

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: props.editorState || EditorState.createEmpty(),
      urlValue: '',
      showURLInput: false,
    };
  }

  onEditorChange = editor => this.setState({ editor });
  onURLChange = e => this.setState({ urlValue: e.target.value });

  handleKeyCommand = (cmd, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, cmd);
    if (newState) {
      this.onEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  editorStateToHTML = () => {
    const content = this.state.editor.getCurrentContent();
    const html = stateToHTML(content);
    return html.slice(3, html.length - 4);
  };

  clear = () => this.setState({ editor: this.props.editorState });

  handleLinkEntity = () => {
    const { editor } = this.state;
    const selection = editor.getSelection();
    if (!selection.isCollapsed()) {
      const currContent = editor.getCurrentContent();
      const startKey = editor.getSelection().getStartKey();
      const startOffset = editor.getSelection().getStartOffset();
      const blockWithLinkKey = currContent.getBlockForKey(startKey);
      const linkKey = blockWithLinkKey.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = currContent.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({ urlValue: url, showURLInput: true });
    }
  };

  confirmLink = () => {
    const { editor, urlValue } = this.state;
    const currContent = editor.getCurrentContent();
    const contentWithEntity = currContent.createEntity('LINK', 'MUTABLE', {
      url: urlValue,
    });
    const entityKey = currContent.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editor, {
      currentContent: contentWithEntity,
    });
    this.setState(
      {
        editor: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey,
        ),
        showURLInput: false,
        urlValue: '',
      },
      () => this.editor.focus(),
      0,
    );
  };

  removeLink = () => {
    const { editor } = this.state;
    const selection = editor.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editor: RichUtils.toggleLink(editor, selection, null),
        showURLInput: false,
        urlValue: '',
      });
    }
  };

  handleButtonAction = action => {
    const { editor } = this.state;
    switch (action) {
      case 'LINK':
        this.confirmLink();
        break;
      case 'LINK_TOGGLE':
        this.handleLinkEntity();
        break;
      case 'UNLINK':
        this.removeLink();
        break;
      case 'SAVE':
        this.props.onSave(this.editorStateToHTML());
        break;
      default:
        this.onEditorChange(RichUtils.toggleInlineStyle(editor, action));
        break;
    }
  };

  passRef = el => {
    this.editor = el;
    if (this.props.editorRef && el) {
      el.toHTML = this.editorStateToHTML.bind(this);
      el.clearState = this.clear.bind(this);
      this.props.editorRef(el);
    }
  };

  render() {
    const { inverse, fullWidth, showSave } = this.props;
    return (
      <EditorWrapper inverse={inverse} fullWidth={fullWidth}>
        <EditorToolbar
          onAction={this.handleButtonAction}
          showURLInput={this.state.showURLInput}
          urlValue={this.state.urlValue}
          onURLChange={this.onURLChange}
          showSave={showSave}
        />
        <Editor
          handleKeyCommand={this.handleKeyCommand}
          customStyleMap={this.props.customStyles}
          editorState={this.state.editor}
          onChange={this.onEditorChange}
          ref={this.passRef}
        />
      </EditorWrapper>
    );
  }
}

export default TextEditor;
