import React, { Component } from 'react';
import styled from 'styled-components';
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

  .DraftEditor-editorContainer,
  .DraftEditor-root,
  .public-DraftEditor-content {
    height: inherit;
    text-align: initial;
  }
  .public-DraftEditor-content[contenteditable='true'] {
    -webkit-user-modify: read-write-plaintext-only;
  }
  .DraftEditor-root {
    position: relative;
  }
  .DraftEditor-editorContainer {
    background-color: rgba(255, 255, 255, 0);
    border-left: 0.1px solid transparent;
    position: relative;
    z-index: 1;
  }
  .public-DraftEditor-block {
    position: relative;
  }
  .DraftEditor-alignLeft .public-DraftStyleDefault-block {
    text-align: left;
  }
  .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {
    left: 0;
    text-align: left;
  }
  .DraftEditor-alignCenter .public-DraftStyleDefault-block {
    text-align: center;
  }
  .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }
  .DraftEditor-alignRight .public-DraftStyleDefault-block {
    text-align: right;
  }
  .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {
    right: 0;
    text-align: right;
  }
  .public-DraftEditorPlaceholder-root {
    color: #9197a3;
    position: absolute;
    z-index: 1;
  }
  .public-DraftEditorPlaceholder-hasFocus {
    color: #bdc1c9;
  }
  .DraftEditorPlaceholder-hidden {
    display: none;
  }
  .public-DraftStyleDefault-block {
    position: relative;
    white-space: pre-wrap;
  }
  .public-DraftStyleDefault-ltr {
    direction: ltr;
    text-align: left;
  }
  .public-DraftStyleDefault-rtl {
    direction: rtl;
    text-align: right;
  }
  .public-DraftStyleDefault-listLTR {
    direction: ltr;
  }
  .public-DraftStyleDefault-listRTL {
    direction: rtl;
  }
  .public-DraftStyleDefault-ol,
  .public-DraftStyleDefault-ul {
    margin: 16px 0;
    padding: 0;
  }
  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 1.5em;
  }
  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL {
    margin-right: 1.5em;
  }
  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
    margin-left: 3em;
  }
  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL {
    margin-right: 3em;
  }
  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
    margin-left: 4.5em;
  }
  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL {
    margin-right: 4.5em;
  }
  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
    margin-left: 6em;
  }
  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL {
    margin-right: 6em;
  }
  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
    margin-left: 7.5em;
  }
  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL {
    margin-right: 7.5em;
  }
  .public-DraftStyleDefault-unorderedListItem {
    list-style-type: square;
    position: relative;
  }
  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0 {
    list-style-type: disc;
  }
  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1 {
    list-style-type: circle;
  }
  .public-DraftStyleDefault-orderedListItem {
    list-style-type: none;
    position: relative;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
    left: -36px;
    position: absolute;
    text-align: right;
    width: 30px;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before {
    position: absolute;
    right: -36px;
    text-align: left;
    width: 30px;
  }
  .public-DraftStyleDefault-orderedListItem:before {
    content: counter(ol0) '. ';
    counter-increment: ol0;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before {
    content: counter(ol1) '. ';
    counter-increment: ol1;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before {
    content: counter(ol2) '. ';
    counter-increment: ol2;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before {
    content: counter(ol3) '. ';
    counter-increment: ol3;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before {
    content: counter(ol4) '. ';
    counter-increment: ol4;
  }
  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset {
    counter-reset: ol0;
  }
  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset {
    counter-reset: ol1;
  }
  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset {
    counter-reset: ol2;
  }
  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset {
    counter-reset: ol3;
  }
  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset {
    counter-reset: ol4;
  }
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
