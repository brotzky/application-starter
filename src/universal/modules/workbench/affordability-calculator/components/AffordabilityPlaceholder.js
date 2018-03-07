import React from 'react';
import styled from 'styled-components';

const ContentHeader = styled.div`
  height: 69.34px;
  width: 100%;
  background: rgba(0, 0, 0, 0.04);
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
  padding: 15px 12px 33px;
  height: 79px;
`;

const PlaceholderLine = styled.div`
  height: ${props => (props.height ? props.height : '10px')};
  background: #f1f1f1;
  animation: checklist-loading 1.25s linear infinite;
  width: ${props => props.width};
  margin-bottom: ${props => (props.header ? '8px' : '0')};
`;

const Content = headerWidth => {
  return (
    <div>
      <ContentHeader>
        <div className="CalculatorColumn__one">
          <PlaceholderLine header height="25px" width={headerWidth} />
        </div>
        <div className="CalculatorColumn__two">
          <PlaceholderLine header height="25px" width="52px" />
        </div>
        <div className="CalculatorColumn__three" />
      </ContentHeader>
      <ContentRow />
      <ContentBottomRow className="CalculatorBottomRow">
        <PlaceholderLine header height="25px" width="92px" />
      </ContentBottomRow>
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
      <div className="CalculatorResults">
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
  <div className="AffordabilityPlaceholder">
    <div className="Calculator">
      <div className="CalculatorColumn CalculatorSidebar">
        <Sidebar />
        <Save />
      </div>
      <div className="CalculatorColumn">
        <div className="CalculatorInputTable">
          {Content('200px')}
          {Content('190px')}
          {Content('180px')}
          {Content('150px')}
        </div>
      </div>
    </div>
  </div>
);

export default AffordabilityPlaceholder;
