// Currently not using this file. Keeping this just in case

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalizeString } from 'grow-utils/stringFormatting';

const HeaderContainer = styled.header`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.37rem 3rem;
  border-bottom: 1px solid #ebeef0;
  background: #fafafa;
`;

const HeaderHeadingGroup = styled.span`
  display: flex;
  align-items: center;
`;

const Heading = styled.h5`
  margin: 0;
  font-size: 1.6rem;
`;
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
    <HeaderContainer>
      <HeaderHeadingGroup>
        <Heading id={headerTextCaps.split(' ').join('')}>
          {headerTextCaps}
        </Heading>
      </HeaderHeadingGroup>
    </HeaderContainer>
  );
};

ChecklistHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default ChecklistHeader;
