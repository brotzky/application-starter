import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.tr`
  text-align: ${props => (props.textAlign ? props.textAlign : 'inherit')};
  border-collapse: collapse;
  background: #fff;

  &:nth-child(even) {
    ${props => props.striped && 'background: #fafafa;'};
  }

  &:last-child td {
    border-bottom: 0;
  }
`;

const TableRow = ({ children, ...rest }, context) => {
  return (
    <Container {...rest} {...context}>
      {children}
    </Container>
  );
};

TableRow.contextTypes = {
  striped: PropTypes.bool, //row content should be padded on left and right
};
export default TableRow;
