import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FadeIn } from '../../../../../../ui/transitions';

const ErrorContainer = styled.div`
  padding: 2.25rem;
  position: relative;
  background: ${props => props.theme.colors.errorPink};
  border: 1px solid rgba(245, 77, 61, 0.24);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 85%;
`;

const ErrorHeader = styled.h4`
  color: ${props => props.theme.colors.red};
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.red};
  font-size: 1.5rem;
  margin-bottom: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  text-decoration-skip: ink;
`;

const LegalDocumentsErrorHandler = ({ workbench, error, member }) => {
  if (error === undefined) return null;

  // Posible Enums -- this is a placeholder until backend provides correct API
  // 'INCOMPLETE_MONTHLY_PAYMENT_SOURCE_METADATA'
  // 'INCOMPLETE_EMPLOYMENT_INFO_METADATA'
  // 'QUOTE_NOT_FOUND'

  const baseUrl = `/members/${member.id}/workbench/${workbench.id}/${
    workbench.productName
  }/applicant-profile`;

  switch (error) {
    case 'INCOMPLETE_MONTHLY_PAYMENT_SOURCE_METADATA':
    case 'INTERNAL_SERVER_ERROR':
      return (
        <ErrorContainer>
          <ErrorHeader>Monthly payment source is incomplete.</ErrorHeader>
          <ErrorText>
            Please provide {member.firstName}'s{' '}
            <StyledLink
              to={`${baseUrl}/financial-information#Monthlypaymentsource`}
            >
              monthly payment source information
            </StyledLink>{' '}
            to be able to send legal documents for signing.
          </ErrorText>
        </ErrorContainer>
      );
    default:
      return null;
  }
};

LegalDocumentsErrorHandler.defaultProps = {
  error: undefined,
  firstName: '',
};

LegalDocumentsErrorHandler.propTypes = {
  error: PropTypes.string,
  firstName: PropTypes.string,
};

export default LegalDocumentsErrorHandler;
