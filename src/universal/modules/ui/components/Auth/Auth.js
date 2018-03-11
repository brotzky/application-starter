import styled, { keyframes } from 'styled-components';

const scaleRight = keyframes`
  0% {
    transform: scale(0) translateX(2px);
  }
  50% {
    transform: scale(10) translateX(-11px);
  }
  100% {
    transform: scale(0) translateX(0px);
  }
}`;

const scaleLeft = keyframes`
  0% {
    transform: scale(0) translateX(-2px);
  }
  50% {
    transform: scale(10) translateX(11px);
  }
  100% {
    transform: scale(0) translateX(0px);
  }
}`;

export const AuthLoaderWrapper = styled.div`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.font.size3};
`;

export const AuthWrapperLoading = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AuthWrapperLogo = styled.img`
  height: 75px;
`;

export const AuthLoaderAnimation = styled.div`
  position: relative;
  margin-top: 4.2rem;
  height: 2px;
  width: 130px;
  background: ${props => props.theme.colors.greyBg};
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    height: 6px;
    width: 6px;
    top: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: ${props => props.theme.colors.blue};
    border-radius: 50%;
    animation: ${scaleRight} 2s ease infinite;
  }

  &::after {
    content: '';
    position: absolute;
    height: 6px;
    width: 6px;
    top: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: ${props => props.theme.colors.blue};
    border-radius: 50%;
    animation: ${scaleLeft} 2s ease infinite;
  }
`;
