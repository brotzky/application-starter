import React from 'react';
import styled from 'styled-components';
import {
  CalculatorColumnOne,
  CalculatorColumnTwo,
  CalculatorColumnThree,
  media,
} from 'gac-utils/sc';

const AffordabilityPlaceholderContainer = styled.div`
  max-width: 1200px;
  min-height: 767px;
  margin: 0 auto;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
`;

const CalculatorSidebarPlaceholder = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 300px;
  padding: 2.4rem;
  border-right: 1px solid #ebeef0;

  ${media.xlarge`
    width: 325px;
    padding: 2.4rem 3rem;
  `};
`;

const ContentHeader = styled.div`
  height: 69.34px;
  width: 100%;
  background: #fafafa;
  padding: 1.28571rem 1.2rem 0.75rem;
  display: flex;
  align-items: flex-end;
`;

const ContentRow = styled.div`
  border-bottom: 1px solid #efefef;
  height: 44px;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem 1.1rem 1.5rem;
  width: 100%;
`;

const ContentBottomRow = styled.div`
  border-bottom: 1px solid #efefef;
  height: 79px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.92rem 1.6rem 3.6rem;
  background-color: white;
`;

const PlaceholderLine = styled.div`
  height: ${props => (props.height ? props.height : '10px')};
  background: #f1f1f1;
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
  width: ${props => props.width};
  margin-bottom: ${props => (props.header ? '8px' : '0')};
`;

const Content = headerWidth => {
  return (
    <div>
      <ContentHeader>
        <CalculatorColumnOne />
        <CalculatorColumnTwo />
        <CalculatorColumnThree />
      </ContentHeader>
      <ContentRow />
      <ContentBottomRow />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div>
      <div style={{ height: '67px', marginBottom: '20px' }}>
        <PlaceholderLine header width="88px" />
        <PlaceholderLine height="40px" width="100%" />
      </div>
      <div style={{ height: '67px', marginBottom: '20px' }}>
        <PlaceholderLine header width="88px" />
        <PlaceholderLine height="40px" width="100%" />
      </div>
      <div>
        <PlaceholderLine header height="25px" width="126px" />
        <PlaceholderLine header height="25px" width="126px" />
        <PlaceholderLine header height="25px" width="126px" />
      </div>
    </div>
  );
};

const Save = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <PlaceholderLine header width="144px" />
        <PlaceholderLine height="40px" width="100%" />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <PlaceholderLine header width="101px" />
        <PlaceholderLine height="40px" width="100%" />
      </div>
      <div>
        <PlaceholderLine height="47px" width="100%" />
      </div>
    </div>
  );
};

const AffordabilityPlaceholder = () => (
  <AffordabilityPlaceholderContainer>
    <div style={{ display: 'flex' }}>
      <CalculatorSidebarPlaceholder>
        <Sidebar />
        <Save />
      </CalculatorSidebarPlaceholder>
      <div style={{ flex: '1' }}>
        {Content('200px')}
        {Content('190px')}
        {Content('180px')}
        {Content('150px')}
      </div>
    </div>
  </AffordabilityPlaceholderContainer>
);

export default AffordabilityPlaceholder;
