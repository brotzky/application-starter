import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  font-size: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const EditorToolbar = ({
  onAction,
  showURLInput,
  onURLChange,
  urlValue,
  showSave = false,
}) => {
  let urlInput;

  if (showURLInput) {
    urlInput = (
      <div key={4}>
        <input type="text" value={urlValue} onChange={onURLChange} />
        <button onClick={() => onAction('LINK')}>LINK IT!</button>
      </div>
    );
  }
  return (
    <Wrapper>
      <Button onClick={() => onAction('BOLD')}>
        <strong>B</strong>
      </Button>
      <Button onClick={() => onAction('ITALIC')}>
        <em>i</em>
      </Button>
      <Button onClick={() => onAction('LINK_TOGGLE')}>L</Button>
      {urlInput}
      <Button onClick={() => onAction('UNLINK')}>U/L</Button>
      {showSave && (
        <Button style={{ marginLeft: 'auto' }} onClick={() => onAction('SAVE')}>
          Save
        </Button>
      )}
    </Wrapper>
  );
};

export default EditorToolbar;
