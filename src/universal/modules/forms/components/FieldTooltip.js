// @flow
import React from 'react';
import styled from 'styled-components';

const QuestionIcon = () => (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    enableBackground="new 0 0 16 16"
    xmlSpace="preserve"
  >
    <g transform="translate(0, 0)">
      <circle
        data-color="color-2"
        fill="#444444"
        cx="8"
        cy="13.5"
        r="1.5"
      />{' '}
      <path
        fill="#444444"
        d="M8,0C6.309,0,4.792,1.072,4.229,2.667L3.895,3.609L5.78,4.276l0.333-0.943C6.396,2.536,7.154,2,8,2 c1.103,0,2,0.897,2,2c0,0.632-0.245,0.839-0.952,1.347C8.184,5.967,7,6.817,7,9v1h2V9c0-1.157,0.482-1.503,1.214-2.028 C10.968,6.431,12,5.69,12,4C12,1.794,10.206,0,8,0z"
      />
    </g>
  </svg>
);

const FieldTooltipWrapper = styled.div`
  position: relative;

  &:hover {
    #tooltip-content {
      opacity: 1;
      transform: none;
      visibility: visible;
    }
  }
`;

const Icon = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.grey.light};
  border-radius: 50%;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;

  svg {
    height: 12px;
    width: 12px;
    * {
      fill: white;
    }
  }
`;

const ContentWrapper = styled.div`
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.grey.light};
  bottom: 2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: ${props => `${props.theme.space / -4}rem`};
  transform: translateY(20%);
  transition: all 0.2s ease-out;
  visibility: hidden;
  will-change: transform, opacity;
`;

const Content = styled.p`
  background: white;
  color: ${props => props.theme.colors.grey.dark};
  margin: 0;
  padding: ${props =>
    `${props.theme.space / 5}rem ${props.theme.space / 4}rem`};
  position: relative;
  text-transform: none;
  width: 30rem;
  z-index: 1;
`;

// rotated div
const Triangle = styled.div`
  background: white;
  border-right: 1px solid ${props => props.theme.colors.grey.light};
  border-bottom: 1px solid ${props => props.theme.colors.grey.light};
  bottom: -6px;
  height: 10px;
  position: absolute;
  right: 9px;
  transform: rotate(45deg);
  width: 10px;
  z-index: 1;
`;

const FieldTooltip = props => {
  const { tooltip } = props;
  return (
    <FieldTooltipWrapper>
      <Icon>
        <QuestionIcon />
      </Icon>
      <ContentWrapper id="tooltip-content">
        <Content>{tooltip}</Content>
        <Triangle />
      </ContentWrapper>
    </FieldTooltipWrapper>
  );
};

export default FieldTooltip;
