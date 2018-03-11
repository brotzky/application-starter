import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TextLink = props => (
  <StyledLink to={props.path || '/'}>
    <span>{props.text}</span>
  </StyledLink>
);

export default TextLink;
