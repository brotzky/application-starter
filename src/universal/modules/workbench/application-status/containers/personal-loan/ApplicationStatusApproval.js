import React from 'react';
import styled from 'styled-components';
import RecommendationApproveButton from '../../../recommendation/components/RecommendationApproveButton';
import StatusDeclineButton from '../../../status/components/StatusDeclineButton';

const ButtonWrapper = styled.div`
  margin-right: 3rem;
  display: inline-block;
`;

const ApplicationStatusApproval = () => (
  <div>
    <ButtonWrapper>
      <RecommendationApproveButton />
    </ButtonWrapper>
    <ButtonWrapper>
      <StatusDeclineButton isFromAppStatusPage={true} />
    </ButtonWrapper>
  </div>
);

export default ApplicationStatusApproval;
