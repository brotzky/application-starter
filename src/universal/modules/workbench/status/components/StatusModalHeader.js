import React from 'react';
import styled from 'styled-components';
import { capitalizeString } from 'grow-utils/stringFormatting';

const RecommendationDeclineModalHeader = styled.header`
  text-align: center;
  margin-bottom: 20px;
  h4 {
    font-size: 2.812rem;
  }
`;
const StatusModalHeader = props => {
  const { workbench } = props;
  return (
    <RecommendationDeclineModalHeader>
      <h4>
        {workbench.creator.firstName}'s{' '}
        {capitalizeString(workbench.productName, '-', ' ')} application
      </h4>
    </RecommendationDeclineModalHeader>
  );
};

export default StatusModalHeader;
