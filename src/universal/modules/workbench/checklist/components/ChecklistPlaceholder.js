import React from 'react';
import styled, { keyframes } from 'styled-components';

const checklistLoading = keyframes`
    0% {
      background-position: 0;
      opacity: 0.3;
    }
    50% {
      background-position: 250px;
      opacity: 1;
    }
    100% {
      background-position: 500px;
      opacity: 0.3;
    }`;

const PlaceholderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 49px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #efefef;
  padding: 0 2.83rem;
`;

const TopRowPrimary = styled.div`
  height: 8px;
  width: 25px;
  background: #e4e4e4;
  margin-right: 2rem;
  animation: ${checklistLoading} 1.25s linear infinite;
`;

const HeaderRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 51px;
  width: 100%;
  background: #efefef;
  border-bottom: 1px solid #efefef;
  background: #fafafa;
  padding: 0 2.83rem;
`;

const HeaderRowHeader = styled.div`
  height: 8px;
  background: #e4e4e4;
  animation: ${checklistLoading} 1.25s linear infinite;
`;

const HeaderRowDetails = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRowDetailsLine = styled.div`
  height: 8px;
  width: 85px;
  background: #e4e4e4;
  animation: ${checklistLoading} 1.25s linear infinite;
`;

const HeaderRowDetailsCircle = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin-left: 1.5rem;
  background: #e4e4e4;
  animation: ${checklistLoading} 1.25s linear infinite;
`;

const PlaceholderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44.5px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #efefef;
  padding: 0 2.83rem;
`;

const PlaceholderRowFront = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceholderRowFrontCircle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 1.5rem;
  background: #f1f1f1;
  animation: ${checklistLoading} 1.25s linear infinite;
`;

const PlaceholderRowFrontLine = styled.div`
  height: 8px;
  background: #f1f1f1;
  animation: ${checklistLoading} 1.25s linear infinite;
`;

const PlaceholderRowCircle = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  background: #f1f1f1;
`;

const ChecklistTop = () => (
  <PlaceholderTopRow>
    <div style={{ display: 'flex' }}>
      <TopRowPrimary style={{ width: '34px' }} />
      <TopRowPrimary style={{ width: '44px' }} />
      <TopRowPrimary style={{ width: '38px' }} />
      <TopRowPrimary style={{ width: '38px' }} />
    </div>
    <div style={{ display: 'flex' }}>
      <TopRowPrimary style={{ width: '72px' }} />
      <TopRowPrimary style={{ width: '73px' }} />
      <TopRowPrimary style={{ width: '80px' }} />
      <TopRowPrimary style={{ width: '88px', marginRight: '0' }} />
    </div>
  </PlaceholderTopRow>
);

const HeaderRow = width => (
  <HeaderRowWrapper>
    <HeaderRowHeader style={{ width }} />
    <HeaderRowDetails>
      <HeaderRowDetailsLine />
      <HeaderRowDetailsCircle />
    </HeaderRowDetails>
  </HeaderRowWrapper>
);

const ChecklistRow = width => (
  <PlaceholderRow>
    <PlaceholderRowFront>
      <PlaceholderRowFrontCircle />
      <PlaceholderRowFrontLine style={{ width }} />
    </PlaceholderRowFront>
    <PlaceholderRowCircle />
  </PlaceholderRow>
);

const ChecklistPlaceholder = () => (
  <div>
    {ChecklistTop('278px')}
    {HeaderRow('278px')}
    {ChecklistRow('125px')}
    {ChecklistRow('144px')}
    {ChecklistRow('150px')}
    {ChecklistRow('135px')}
    {HeaderRow('219px')}
    {ChecklistRow('119px')}
    {ChecklistRow('85px')}
    {ChecklistRow('115px')}
    {ChecklistRow('145px')}
    {HeaderRow('231px')}
    {ChecklistRow('132px')}
    {ChecklistRow('123px')}
    {ChecklistRow('103px')}
    {ChecklistRow('133px')}
    {HeaderRow('231px')}
    {ChecklistRow('132px')}
    {ChecklistRow('123px')}
    {ChecklistRow('103px')}
    {ChecklistRow('133px')}
  </div>
);

export default ChecklistPlaceholder;
