import React from 'react';
import styled from 'styled-components';
import { FadeIn } from '../../../ui/transitions/';
import { EmptyState } from '../../../ui/components';
import { EmptyCreditReport } from '../../../ui/icons/';
import CreditBureauControls from './CreditBureauControls';
import CreditBureauPlaceholder from './CreditBureauPlaceholder';

const Flicker = styled.div`
  animation: ${props => props.theme.animations.flicker} 1.25s linear infinite;
`;

/**
 * CreditReport is a component that takes the report
 * and renders it to the view. Otherwise show a message
 * saything the Credit Bureau has not been pulled.
 */
const CreditReport = ({ creditBureau, firstName, memberId, permissions }) => (
  <div className="CreditBureauReport">
    <CreditBureauControls memberId={memberId} />
    <div className="CreditBureauReportPaper">
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
    </div>
  </div>
);

export default CreditReport;
