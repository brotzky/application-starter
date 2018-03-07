import React from 'react';

const StatusModalHeader = props => {
  const { workbench } = props;
  return (
    <header className="RecommendationDeclineModal__header">
      <h4 className="RecommendationDeclineModal__header-heading">
        {workbench.creator.firstName}'s{' '}
        {workbench.productName.split('-').join(' ')} application
      </h4>
    </header>
  );
};

export default StatusModalHeader;
