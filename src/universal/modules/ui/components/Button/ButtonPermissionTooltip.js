import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { permissionsPropType } from 'gac-utils/proptypes';

/**
 * <ButtonPermissionTooltip />

 */
const TooltipContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  opacity: 0;
  border-radius: 4px;
  padding: 1.2rem;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 4px 22px rgba(27, 39, 51, 0.14);
  color: ${props => props.theme.colors.black};
  font-weight: 400;

  transition: opacity 0.2s, transform 0.2s;
  transform: translate3d(-50%, -20px, 0);
  left: 50%;

  z-index: 9999;
  bottom: 100%;
  text-align: left;
  font-size: 1.4rem;
  line-height: 1.4;
  background: #fff;
  cursor: pointer;
  pointer-events: none;
  min-width: 178px;

  &::after {
    content: '';
    top: 100%;
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-top-color: #fff;
    border-width: 8px;
    margin-left: -8px;
  }

  &::before {
    content: '';
    background: transparent;
    height: 62px;
    width: 100%;
    position: absolute;
    left: 0;
  }
`;

const TooltipTitle = styled.h6`
  font-size: 1.1rem;
  opacity: 0.56;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 3px;
`;

const ButtonPermissionTooltip = ({ permission }) => {
  if (!permission) return null;

  return (
    <TooltipContainer
      id="ButtonPermissionTooltip"
      onClick={() => dispatch(push('/account/roles'))}
    >
      <TooltipTitle>Requires permission</TooltipTitle>
      <div>{permission.prettyName}</div>
    </TooltipContainer>
  );
};

ButtonPermissionTooltip.propTypes = {
  permission: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect()(ButtonPermissionTooltip);
