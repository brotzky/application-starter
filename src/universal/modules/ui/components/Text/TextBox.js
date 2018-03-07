import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Display text on a coloured background.
 */
const Box = styled.div`
  width: ${props => props.width}px;
  min-width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: ${props => (props.background ? props.background : '#bdc3cc')};
  color: #fff;
  border-radius: 3px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  ${props => props.circular && `border-radius: ${props.width}px`};

  &:hover {
    text-decoration: none;
  }
`;
const TextBox = ({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
};
TextBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  background: PropTypes.string,
  circular: PropTypes.bool,
};
export default TextBox;
