import React from 'react';
import styled from 'styled-components';
import { media } from 'gac-utils/sc';
import { FadeIn } from '../../../ui/transitions/';
import { EmptyState } from '../../../ui/components';
import { EmptyCreditReport } from '../../../ui/icons/';
import CreditBureauControls from './CreditBureauControls';
import CreditBureauPlaceholder from './CreditBureauPlaceholder';

const Flicker = styled.div`
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
`;

const CreditBureauReport = styled.div`
  padding: 0 3.375rem 3.375rem;
  min-width: 755px;
  min-height: 700px;
  background-color: #fff;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  ${media.xlarge`
    padding: 0 3.375rem 3.375rem;
  `};
`;

const CreditBureauReportPaper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(700px - 9rem);
  font-size: 1.7rem;
  color: #262626;
`;

/**
 * CreditReport is a component that takes the report
 * and renders it to the view. Otherwise show a message
 * saything the Credit Bureau has not been pulled.
 */
const CreditReport = ({ creditBureau, firstName, memberId, permissions }) => (
  <CreditBureauReport>
    <CreditBureauControls memberId={memberId} />
    <CreditBureauReportPaper>
      {creditBureau.isFetchingReport ||
      creditBureau.isPullingBureau ||
      creditBureau.isFetching ? (
        <Flicker>
          <CreditBureauPlaceholder />
        </Flicker>
      ) : (
        <div>
          {creditBureau.report && creditBureau.report.report ? (
            <FadeIn>
              <pre>{creditBureau.report.report}</pre>
            </FadeIn>
          ) : (
            <EmptyState
              Icon={EmptyCreditReport}
              text={`${firstName} has not had their Credit Bureau pulled`}
              errors={creditBureau.errors}
            />
          )}
        </div>
      )}
    </CreditBureauReportPaper>
  </CreditBureauReport>
);

export default CreditReport;
