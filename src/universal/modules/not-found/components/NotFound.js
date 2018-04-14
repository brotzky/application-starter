import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  text-align: center;
  height: 100vh;
  padding-top: 30vh;
`;

const NotFound = () => (
  <NotFoundContainer>404 Page Not Found</NotFoundContainer>
);

export default NotFound;
