import React from 'react';
import styled from 'styled-components';

const Container = styled.tbody`
  text-align: ${props => (props.textAlign ? props.textAlign : 'inherit')};
  border-collapse: collapse;
  height: 100%;
  width: 100%;
`;

const TableBody = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default TableBody;
