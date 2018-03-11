import React from 'react';
import styled from 'styled-components';

const CreditBureauOverview = styled.div`
  width: 100%;
  background-color: #fff;
  margin-bottom: 2.25rem;
`;

const CreditBureauBody = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.25rem;
`;

// Sugar to hide some divs and classes
const CreditBureauControlsContainer = ({ children }) => (
  <CreditBureauOverview>
    <CreditBureauBody>{children}</CreditBureauBody>
  </CreditBureauOverview>
);

export default CreditBureauControlsContainer;
