import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const Container = styled.th`
  padding-left: 11px;
  padding-right: 11px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'inherit')};
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  border-collapse: collapse;
  vertical-align: middle;

  ${props => props.gutters && '&:first-child {padding-left: 2.25rem;}'};

  ${props => props.gutters && '&:last-child {padding-right: 2.25rem;}'};
`;

const TableHeaderCell = ({ children, ...rest }, context) => {
  return (
    <Container {...rest} {...context}>
      {children}
    </Container>
  );
};

TableHeaderCell.contextTypes = {
  gutters: PropTypes.bool,
};
export default TableHeaderCell;
