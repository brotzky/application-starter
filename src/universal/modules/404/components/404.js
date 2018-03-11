import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Button } from '../../ui/components';
import AuthWrapper from '../../auth/containers/AuthWrapper';

const NotFoundCard = Card.extend`
  text-align: center;
  height: 100vh;
  padding-top: 30vh;
`;

const NotFoundTitle = styled.h1`
  padding: 2.5rem;
`;

const NotFoundText = styled.h4`
  padding: 2rem;
`;

const NotFoundRedirectButton = styled.h5`
  padding: 1rem;
`;

const NotFound = () => (
  <NotFoundCard>
    <NotFoundTitle>404 Page Not Found</NotFoundTitle>
    <NotFoundText>Oops! We couldn't find this page.</NotFoundText>
    <NotFoundRedirectButton>
      <Link to="/applications">
        <Button size="xlarge" text="Go to Applications" />
      </Link>
    </NotFoundRedirectButton>
  </NotFoundCard>
);

export default AuthWrapper(NotFound);
