import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getMaskedSteps from 'grow-utils/steps';
import { CheckCircleFilled } from '../../../ui/icons/';
import { FadeIn } from '../../../ui/transitions';

/**
 * steps
 * All the steps possible within Grow Admin Console. We use this as a
 * base and then create specific masked versions for each partner.
 */

const ProgressHeader = styled.h3`
  margin-bottom: 2.25rem;
  font-size: 2rem;
`;

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 1.75rem;

  &:last-child {
    padding-bottom: 0;
  }

  &:last-child::before {
    content: none;
  }

  &::before {
    content: '';
    position: absolute;
    height: 2.7rem;
    width: 2px;
    top: 18px;
    left: 11px;
    background: ${props =>
      props.isComplete
        ? props.isDeclined && props.isCurrentStep
          ? props.theme.colors.red
          : props.theme.colors.blue
        : '#d8d7d7'};
    transition: background 300ms ease;
  }
`;

const ItemText = styled.div`
  text-transform: uppercase;
  margin-left: 2.5rem;
  color: ${props =>
    props.isCurrentStep
      ? props.isDeclined ? props.theme.colors.red : props.theme.colors.black
      : props.theme.colors.greyMid};
  font-size: 1.5rem;
  font-weight: ${props => (props.isCurrentStep ? '600' : '500')};
  cursor: ${props => (props.isDeclined ? 'pointer' : 'initial')};

  &:hover ~ .ItemTextState {
    opacity: 1;
    transform: translateY(1rem);
  }
`;
const ItemTextState = styled.div`
  position: absolute;
  opacity: 0;
  color: ${props => props.theme.colors.red};
  font-size: 1.1rem;
  font-weight: 500;
  left: 5rem;
  top: 1rem;
  transform: translateY(0);
  transition: 200ms ease;
  text-transform: uppercase;
  letter-space: 0.1px;
  pointer-events: none;
`;

const CheckCircle = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: ${props =>
    props.isCurrentStep
      ? props.isDeclined
        ? `3px solid ${props.theme.colors.red}`
        : `3px solid ${props.theme.colors.blue}`
      : '2px solid #adadad'};
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  background: ${props => props.theme.colors.greyBg};
  box-shadow: 0px 0px 0px 3px ${props => props.theme.colors.greyBg};
`;

const StyledCheckCircleFilled = styled(CheckCircleFilled)`
  position: relative;
  box-shadow: 0px 0px 0px 3px ${props => props.theme.colors.greyBg};
`;

const WorkbenchShellSidebarProgress = ({
  currentStep,
  organization,
  state,
  steps,
}) => {
  const currentStepIndex = steps.indexOf(currentStep);
  const isDeclined = state === 'declined';

  return (
    <FadeIn component="div">
      <ProgressHeader>Application Progress</ProgressHeader>
      {steps.map((step, index) => {
        const isCurrentStep = currentStepIndex === index;
        const isComplete = index < currentStepIndex;
        const appIsComplete = currentStepIndex === steps.length - 1;

        return (
          <ItemContainer
            isComplete={isComplete}
            isCurrentStep={isCurrentStep}
            isDeclined={isDeclined}
            key={step}
          >
            {appIsComplete || isComplete ? (
              <FadeIn>
                <StyledCheckCircleFilled
                  height="24px"
                  width="24px"
                  id={`${step.toUpperCase()}_COMPLETE`}
                />
              </FadeIn>
            ) : (
              <CheckCircle
                isCurrentStep={isCurrentStep}
                isDeclined={isDeclined}
              />
            )}
            <ItemText isCurrentStep={isCurrentStep} isDeclined={isDeclined}>
              {getMaskedSteps(organization, step)}
            </ItemText>
            {isCurrentStep &&
              isDeclined && (
                <ItemTextState className="ItemTextState">{state}</ItemTextState>
              )}
          </ItemContainer>
        );
      })}
    </FadeIn>
  );
};

const mapStateToProps = state => ({
  currentStep: state.workbench.currentStep,
  state: state.workbench.state,
  organization: state.auth.organization,
  steps: state.configs.workbench.config.progress.steps,
});

WorkbenchShellSidebarProgress.propTypes = {
  currentStep: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WorkbenchShellSidebarProgress);
