import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeString } from 'grow-utils/stringFormatting';

const ChecklistHeader = ({ heading }) => {
  /**
   * Transforming the text to be pretty text for the UI
   * as we're working with an ENUM value from backend.
   * APPLICANT_PROFILE_ABOUT, for example.
   */
  const headerTextCaps = capitalizeString(
    heading.replace(/APPLICANT_PROFILE_/, ''),
    '_',
    ' ',
  );

  return (
    <header className="SectionHeader ChecklistHeader">
      <span className="ChecklistHeader__heading-group">
        <h5
          className="SectionHeader__heading ChecklistHeader__heading"
          id={headerTextCaps.split(' ').join('')}
        >
          {headerTextCaps}
        </h5>
      </span>
    </header>
  );
};

ChecklistHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default ChecklistHeader;
