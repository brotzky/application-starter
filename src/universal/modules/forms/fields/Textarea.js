import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  border-top: 1px solid #efefef;
  border-left: none;
  border-right: none;
  border-bottom: none;
  width: 100%;
  height: 100%;
  resize: none;
  line-height: inherit;
  padding: 1rem 2rem;

  &:focus,
  &:active {
    outline: none;
    background: ${props => props.theme.colors.greyLight};
  }
`;

const Textarea = props => (
  <TextArea {...props.input} placeholder={props.placeholder} />
);

export default Textarea;
