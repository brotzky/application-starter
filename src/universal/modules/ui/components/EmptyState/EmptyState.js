import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CircleCross } from '../../icons';
import { FadeIn } from '../../transitions/';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 3.375rem 2.25rem;
  text-align: center;
  max-width: 414px;
  margin: 0 auto;
`;

const EmptyStateHeader = styled.h4`
  margin: 10px auto 0;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.5;
  max-width: 450px;
`;

const EmptyStateIcon = styled.div``;

const EmptyStateShadow = styled.div`
  height: 7px;
  width: 50px;
  background-color: rgba(38, 38, 38, 0.07);
  margin: 12px auto;
  border-radius: 50%;
`;

const EmptyState = ({ Icon, text, errors = [] }) => {
  const requiresPermission = errors.includes('NO_PERMISSION');

  return (
    <FadeIn>
      <EmptyStateContainer>
        <EmptyStateIcon>
          {requiresPermission ? (
            <CircleCross className="EmptyStateIcon__icon" />
          ) : (
            <Icon className="EmptyStateIcon__icon" />
          )}
          <EmptyStateShadow />
        </EmptyStateIcon>
        <EmptyStateHeader>{text || 'Permission Required'}</EmptyStateHeader>
      </EmptyStateContainer>
    </FadeIn>
  );
};

EmptyState.defaultProps = {
  Icon: CircleCross,
  text: '',
  errors: [],
};

EmptyState.propTypes = {
  Icon: PropTypes.element,
  text: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default EmptyState;
