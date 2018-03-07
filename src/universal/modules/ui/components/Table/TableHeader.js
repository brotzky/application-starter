import React from 'react';
import styled from 'styled-components';

const Container = styled.thead`border-collapse: collapse;`;

const TableHeader = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default TableHeader;
