import React from 'react';
import styled from 'styled-components';

const FabButton = styled.button`
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 50%;
  text-align: center;
  position: relative;
  z-index: 1;
  background: #448aff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: all 300ms ease;
  @include ease(out);

  &:before {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    background: #000;
    opacity: 0;
    @include ease(out);
  }

  &:hover {
    &:before {
      opacity: 0.07;
    }
  }

  &:active {
    box-shadow: 0 3px 16px rgba(0, 0, 0, 0.3);

    &:before {
      opacity: 0.1;
    }
  }
`;

const Fab = props => (
  <FabButton
    onClick={props.handleClick}
    type="button"
    title={props.title || ''}
  >
    {props.children}
  </FabButton>
);

export default Fab;
