import React from 'react';
import styled from 'styled-components';
import ChecklistItemDetail from './ChecklistItemDetail';

const ChecklistItemDetails = ({
  checklistDetails,
  checklistItem,
  isVerified,
}) => (
  <DetailsWrapper
    style={{
      marginBottom: '30px',
      maxHeight: '300px',
      overflowY: 'scroll',
    }}
  >
    {checklistDetails[checklistItem.name].reduce((result, detail, index) => {
      if (
        detail.verificationResult !== 'RUNNING' ||
        (detail.verificationResult === 'RUNNING' && index === 0)
      ) {
        result.push(
          <ChecklistItemDetail
            key={index}
            checklistItem={checklistItem}
            detail={detail}
          />,
        );
      }
      return result;
    }, [])}
  </DetailsWrapper>
);

export default ChecklistItemDetails;

const DetailsWrapper = styled.div`
  margin-bottom: 30px;
  max-height: 300px;
  overflow-y: scroll;
`;
