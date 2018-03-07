import React from 'react';
import styled from 'styled-components';

const FlickerContainer = styled.div`
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
`;

const PlaceholderText = styled.div`
  height: 1.2rem;
  width: ${props => `${props.width}px` || '10rem'};
  background: #efefef;
`;

const PlaceholderHeader = styled.div`
  height: 1.8rem;
  width: 19rem;
  background: #efefef;
  margin-bottom: 2.25rem;
`;

const PlaceholderCircle = styled.div`
  height: 2.6rem;
  width: 2.6rem;
  background: #efefef;
  margin-right: 2.5rem;
  border-radius: 50%;
`;

const PlaceholderRow = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 1.7rem;
`;

const WorkbenchShellSidebarProgressPlaceholder = ({ length }) => {
  /**
   * rows Array
   * contains a list of numbers that define the width of the placeholder.
   * They're mostly random, but align nicely to the full step flow.
   * Those numbers get passed into <PlaceholderText /> which determines
   * the width of the styled component.
   */
  const rows = [80, 116, 110, 76, 98, 142, 105, 110, 108, 85].slice(0, length);

  return (
    <div>
      <FlickerContainer>
        <PlaceholderHeader />
        {rows.map((row, index) => (
          <PlaceholderRow key={`${row}${index + 1}`}>
            <PlaceholderCircle />
            <PlaceholderText width={row} />
          </PlaceholderRow>
        ))}
      </FlickerContainer>
    </div>
  );
};

export default WorkbenchShellSidebarProgressPlaceholder;
