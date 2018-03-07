import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.td`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  position: relative;
  font-size: 1.4rem;
  text-align: ${props => (props.textAlign ? props.textAlign : 'inherit')};
  ${props => props.divided && 'border-bottom: 1px solid #efefef'};
  ${props =>
    props.celled &&
    'border-left: 1px solid #efefef; border-right:1px solid #efefef;'};
  border-collapse: collapse;
  white-space: nowrap;

  &:first-child {
    ${props => props.gutters && 'padding-left: 2rem;'};
  }

  &:last-child {
    ${props => props.gutters && 'padding-right: 2rem;'};
  }
`;
const supportedProps = ['divided', 'celled', 'gutters', 'textAlign'];
const TableCell = ({ children, ...rest }, context) => {
  return (
    <Container {...rest} {...context}>
      {children}
    </Container>
  );
};
TableCell.contextTypes = {
  gutters: PropTypes.bool,
  divided: PropTypes.bool,
  celled: PropTypes.bool,
};
export default TableCell;
