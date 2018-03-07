import React from 'react';
import styled from 'styled-components';
import AuthFormBackground from './AuthFormBackground';

const AuthFormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;

const NewPasswordWrapper = styled.div`
  width: 40%;
  height: 100vh;
  display: flex;
  padding: 3.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 400px;
`;

const AuthFormWrapper = ({ children }) => (
  <AuthFormContainer>
    <AuthFormBackground />
    <NewPasswordWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </NewPasswordWrapper>
  </AuthFormContainer>
);

export default AuthFormWrapper;
