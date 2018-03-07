import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AdminStepBuilder from './AdminStepBuilder';

const AdminStepContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    height: 100%;
    width: 1px;
    background: #e5e5e5;
    position: absolute;
    left: 44px;
    top: 0px;
    bottom: 0px;
    z-index: 0;
  }
`;

const AdminStep = ({ steps }) => (
  <AdminStepContainer>
    {steps.map(
      step =>
        step.custom ? (
          <span key={step.step}>{step.component}</span>
        ) : (
          <AdminStepBuilder key={step.step} {...step} />
        ),
    )}
  </AdminStepContainer>
);

AdminStep.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdminStep;
