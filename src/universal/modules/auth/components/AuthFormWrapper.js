import React from 'react';
import styled from 'styled-components';
import AuthFormBackground from './AuthFormBackground';
import { FadeIn } from '../../ui/transitions';
import { media } from 'gac-utils/sc';

const AuthFormContainer = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewPasswordWrapper = styled.div`
  width: 38%;
  height: 100vh;
  display: flex;
  padding: 3.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.xlarge`
    width: 42%;
  `};
`;

const ContentWrapper = styled.div`
  max-width: 320px;
`;

const AuthFormWrapper = ({ children }) => (
  <AuthFormContainer>
    <AuthFormBackground />
    <NewPasswordWrapper>
      <FadeIn>
        <ContentWrapper>{children}</ContentWrapper>
      </FadeIn>
    </NewPasswordWrapper>
  </AuthFormContainer>
);

export default AuthFormWrapper;
