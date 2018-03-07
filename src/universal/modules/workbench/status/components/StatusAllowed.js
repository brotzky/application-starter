import React from 'react';
import PropTypes from 'prop-types';
import { FadeInFast } from '../../../ui/transitions/';

const StatusAllowed = ({ workbench, canEdit }) => (
  <FadeInFast>
    {!canEdit || workbench.primaryRep ? null : (
      <div className="RecommendationForm--editable">
        You must be assigned this application to leave a note
      </div>
    )}
  </FadeInFast>
);

StatusAllowed.protoTypes = {
  canEdit: PropTypes.func.isRequired,
  workbench: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
export default StatusAllowed;
