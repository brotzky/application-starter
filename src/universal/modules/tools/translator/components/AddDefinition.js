import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState, ContentState } from 'draft-js';
import Input from './Input';
import TextEditor from './TextEditor';
import Button from '../../../ui/components/Button/Button';
import EditorHeader from './EditorHeader';
import TranslationCompDecorator, {
  customStyles,
} from './TranslationCompositeDecorator';

class AddDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
  }

  handleAddDef = evt => {
    evt.preventDefault();
    const value = this.editor.toHTML();
    const path = this.state.path;
    this.setState(
      {
        path: '',
      },
      () => {
        this.props.onAddDefinition({
          path: `${this.props.category}.${path}`,
          value,
        });
        this.editor.clearState();
      },
    );
  };

  render() {
    return (
      <EditorHeader
        style={{
          padding: '1rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <Input
          placeholder="Path"
          style={{ flex: '80%', width: '80%' }}
          onChange={evt =>
            this.setState({
              path: evt.target.value,
            })
          }
          value={this.state.path}
        />
        <Button
          text="Add Definition"
          onClick={this.handleAddDef}
          type="button"
          size="medium"
          appearance="transparent"
        />
        <TextEditor
          editorRef={el => {
            this.editor = el;
          }}
          editorState={EditorState.createEmpty(TranslationCompDecorator)}
          fullWidth
          inverse
          customStyles={customStyles}
        />
      </EditorHeader>
    );
  }
}

export default AddDefinition;
