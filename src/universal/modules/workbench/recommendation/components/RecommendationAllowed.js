import React from 'react';
import { FadeInFast } from '../../../ui/transitions/';

const RecommendationAllowed = ({ workbench, canEdit }) => {
  return (
    <FadeInFast>
      { canEdit && workbench.state === 'active' ? null : <div className="RecommendationForm--editable">Loan status must be Review or Pending Approval to leave a note</div> }
      { !canEdit || workbench.primaryRep ? null : <div className="RecommendationForm--editable">You must be assigned this application to leave a note</div> }
    </FadeInFast>
  );
};

export default RecommendationAllowed;
