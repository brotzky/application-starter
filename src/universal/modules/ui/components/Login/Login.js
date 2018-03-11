import styled from 'styled-components';
import { media } from 'gac-utils/sc';

export const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
`;

export const LoginWrapper = styled.div`
  position: relative;
`;

export const LoginFormWrapper = styled.div`
  position: relative;
  margin-bottom: 4.8rem;
`;

export const LoginMessage = styled.div`
  position: relative;
  margin-bottom: 4.8rem;
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2.4rem;
`;

export const LoginHeaderLogo = styled.div`
  height: 60px;
  max-width: 200px;
  margin: 0 auto 4.2rem;
`;

export const LoginHeaderHeading = styled.h1`
  font-weight: 600;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

export const LoginHeaderText = styled.p`
  font-size: 1.8rem;
  color: #616161;
  margin-bottom: 5rem;
`;

export const LoginForm = styled.form`
  margin: 0;
  border-radius: 4px;
  background: white;
`;
