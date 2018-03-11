import React from 'react';
import styled from 'styled-components';

const ActionContainer = styled.div`
  ${props => props.margin && `margin-left: 4.5rem`};
`;

const ActionHeader = styled.h4`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const CreditBureauAction = ({ children, margin, text }) => {
  return (
    <ActionContainer margin={margin}>
      <ActionHeader>{text}</ActionHeader>
      {children}
    </ActionContainer>
  );
};

export default CreditBureauAction;
