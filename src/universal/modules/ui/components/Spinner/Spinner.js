import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ease } from 'gac-utils/sc';

const spinnerIE = keyframes`
  to {transform: rotate(360deg);}
`;

const rotator = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(270deg);}`;

const dash = keyframes`
  0% { stroke-dashoffset: 187; }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }`;

const SpinnerIE = styled.div`
  display: block;
  min-width: 30px;
  min-height: 30px;
  margin: 0 auto;
  text-align: center;

  &:before {
    content: 'Loading…';
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  &:not(:required):before {
    content: '';
    border-radius: 50%;
    border: 2px solid ${props => props.theme.colors.greyBg};
    border-top-color: ${props => props.theme.colors.blue};
    animation: ${spinnerIE} 0.6s linear infinite;
    -webkit-animation: ${spinnerIE} 0.6s linear infinite;
  }
`;

const SpinnerSVG = styled.svg`
  margin: 0 auto;
  animation: ${rotator} 1.4s linear infinite;
`;

const SpinnerContainer = styled.div`
  text-align: center;
`;

const Spinner = ({ size = 24, strokeWidth = 6, color = 'white' }) => {
  let isIE = false;

  if (typeof window !== 'undefined') {
    isIE = !!window.MSInputMethodContext && !!document.documentMode;
  }

  if (isIE) {
    return <SpinnerIE />;
  }

  return (
    <SpinnerContainer>
      <SpinnerSVG
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
        viewBox="0 0 66 66"
      >
        <circle
          style={{
            strokeDasharray: '187',
            strokeDashoffset: '0',
            transformOrigin: 'center',
            animation: `${dash} 1.4s ease-in-out infinite`,
          }}
          stroke={color}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </SpinnerSVG>
    </SpinnerContainer>
  );
};

export default Spinner;
