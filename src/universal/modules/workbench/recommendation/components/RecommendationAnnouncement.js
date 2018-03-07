import React from 'react';
import { FadeInFast } from '../../../ui/transitions/';
import { productApplication } from 'grow-utils/productApplicationUtils';

const RecommendationAnnouncement = ({ workbench, org }) => {
  const Application = productApplication(org, workbench.id);
  return (
    <FadeInFast>
      {workbench.state === 'declined' ||
      workbench.currentStep === 'pre-closing' ? (
          <div
            className={`RecommendationAnnouncement ${workbench.state ===
          'declined'
              ? 'RecommendationAnnouncement-declined'
              : ''}`}
          >
            {Application.getMaskedStatus(workbench.currentStep) ===
          'Pending Agreement' ? (
                'Personal Loan application approved and loan agreement sent'
              ) : (
                <span>
                  {workbench.creator.firstName}'s Personal Loan application has been{' '}
                  {workbench.state === 'declined' ? (
                    workbench.state
                  ) : (
                    Application.getMaskedStatus(workbench.currentStep)
                  )}
                </span>
              )}
          </div>
        ) : null}
    </FadeInFast>
  );
};

export default RecommendationAnnouncement;
