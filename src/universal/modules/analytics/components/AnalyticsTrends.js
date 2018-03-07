import React from 'react';

import GraphContainer from 'grow-graph/containers/GraphContainer';
import CreditScoreGraph from '../trends/credit-score/containers/CreditScoreGraph';
import SpendGraph from '../trends/spend/containers/SpendGraph';
import DebtGraph from '../trends/debt/containers/DebtGraph';

import CategoryPie from '../pies/containers/CategoryPie';

const AnalyticsTrends = () => {
  return (
    <div className="AnalyticsTrends">
      <div className="AnalyticsTrends__row">
        <GraphContainer>
          <SpendGraph />
        </GraphContainer>
        <GraphContainer>
          <CategoryPie />
        </GraphContainer>
      </div> 
      <div className="AnalyticsTrends__row">
        <GraphContainer>
          <DebtGraph />
        </GraphContainer>
        <GraphContainer>
          <CreditScoreGraph />
        </GraphContainer>
      </div>
    </div>
  );
}

export default AnalyticsTrends;