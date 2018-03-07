// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ApplicantProfileHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.28571rem 2.8125rem;
  border-bottom: 1px solid #ebeef0;
  background: #fafafa;
`;

const ApplicantProfileHeaderHeading = styled.h5`font-size: 1.6rem;`;

const ApplicantProfileHeader = ({ text = '' }) => (
  <ApplicantProfileHeaderContainer id={text.split(' ').join('')}>
    <ApplicantProfileHeaderHeading>{text}</ApplicantProfileHeaderHeading>
  </ApplicantProfileHeaderContainer>
);

ApplicantProfileHeader.defaultProps = {
  text: '',
};

ApplicantProfileHeader.propTypes = {
  text: PropTypes.string,
};

export default ApplicantProfileHeader;
