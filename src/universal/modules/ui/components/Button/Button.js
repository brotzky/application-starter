// @flow
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner } from 'gac-ui/components/';
import ButtonPermissionTooltip from './ButtonPermissionTooltip';
import { permissionsPropType } from 'gac-utils/proptypes';

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  ${props => (props.width ? `width: ${props.width}` : '')};
  ${props => (props.margin ? `margin: ${props.margin}` : '')};

  &:hover > #ButtonPermissionTooltip {
    opacity: 1;
    transform: translate3d(-50%, -10px, 0);
    pointer-events: initial;
  }
`;

/**
 * <BaseButton /> styled component is extended in three different ways:
 * primary, secondary, and transparent. Each one has its own styles.
 */
const BaseButton = styled.button`
  ${props => (props.width ? `width: ${props.width}` : '')};
  position: relative;
  display: inline-block;
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  cursor: ${props =>
    props.hasPermission && props.showDefaultStyles ? 'pointer' : 'not-allowed'};
  text-transform: none;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  padding: ${props => {
    switch (props.size) {
      case 'small':
        return '0.4rem 1.5rem';
      case 'large':
        return '0.2rem 2rem';
      case 'xlarge':
        return '0.8rem 4rem';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small':
        return 'inherit';
      case 'large':
        return '34px';
      case 'xlarge':
        return '54px';
    }
  }};
  border: 1px solid;
  border-radius: 3px;
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '1.4rem';
      case 'large':
        return '1.4rem';
      case 'xlarge':
        return '1.6rem';
    }
  }};
  line-height: 1.6rem;
  min-width: ${props => {
    switch (props.size) {
      case 'small':
        return '8rem';
      case 'large':
        return '11rem';
      case 'xlarge':
        return '14rem';
    }
  }};
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-out;
  transition-property: background, border, box-shadow, color;
  -webkit-tap-highlight-color: transparent;
`;

const PrimaryButton = BaseButton.extend`
  border-color: ${props =>
    props.hasPermission && props.showDefaultStyles ? '#3480ff' : '#bbc0ca'};
  background: ${props =>
    props.hasPermission && props.showDefaultStyles
      ? 'linear-gradient(to bottom, #448aff, #3480ff)'
      : '#bbc0ca'};

  color: white;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);

  &:hover {
    ${props =>
      props.hasPermission && props.showDefaultStyles
        ? `
          background: linear-gradient(to bottom, #448aff, #3480ff);
          border-color: #3480ff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        `
        : ``};
  }

  &:active {
    background: #387ef3;
    border-color: #387ef3;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.14);
  }
`;

const SecondaryButton = BaseButton.extend`
  border-color: ${props =>
    props.hasPermission && props.showDefaultStyles ? '#448aff' : '#bbc0ca'};
  background: ${props =>
    props.hasPermission && props.showDefaultStyles ? '#fff' : 'transparent'};
  color: ${props =>
    props.hasPermission && props.showDefaultStyles ? '#448aff' : '#bbc0ca'};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  ${props =>
    props.hasPermission && props.showDefaultStyles
      ? `
  &:hover {
    background: #3480ff;
    border-color: #3480ff;
    color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }`
      : ''};

  &:active {
    background: #387ef3;
    color: white;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.14);
  }
`;

const DefaultButton = BaseButton.extend`
  position: relative;
  display: inline-block;
  margin: 0;
  border: 0;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  text-transform: none;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  background: linear-gradient(to bottom, #fff, #f9fafb);
  border: 1px solid #c4cdd5;
  border-radius: 3px;
  font-size: 1.5rem;
  line-height: 1.6rem;
  color: #212b35;
  transition-property: background, border, box-shadow;
  transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  transition-duration: 200ms;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: linear-gradient(to bottom, #f9fafb, #f4f6f8);
    border-color: #c4cdd5;
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    background: linear-gradient(to bottom, #f9fafb, #f4f6f8);
    border-color: #c4cdd5;
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.1),
      inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }
`;

const TransparentButton = BaseButton.extend`
  border-color: ${props => (props.hasPermission ? 'transparent' : '#bbc0ca')};
  background: ${props => (props.hasPermission ? 'transparent' : '#bbc0ca')};
  color: ${props => (props.hasPermission ? '#448aff' : '#fff')};

  ${props =>
    props.hasPermission
      ? `
  &:hover {
    background: #f8f8f8;
  }`
      : ''};

  &:active {
    background: #f8f8f8;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.14);
  }

  &:focus {
    background: #f8f8f8;
  }
`;

const Buttons = {
  default: DefaultButton,
  primary: PrimaryButton,
  secondary: SecondaryButton,
  transparent: TransparentButton,
};

/**
 * <Button />
 *
 * Should be used for all instances of Buttons within Grow Admin Console.
 * This button will ensure that permissions are enforced and design standards
 * are consistent throughout the application.
 *
 * @param {bool} disabled true/false
 * @param {string} text text used for button
 * @param {func} onClick function passed to handle onClick
 * @param {bool} isSubmitting true/false
 * @param {[]} permissions pulled from redux store
 * @param {string} permission ENUM_STRING
 * @param {string} appearance primary, secondary, transparent
 * @param {string} size small, large
 */
const Button = props => {
  const {
    appearance,
    disabled,
    gacPermissions,
    onClick,
    id,
    isSubmitting,
    userPermissions,
    permission,
    size,
    text,
    type,
    width,
    margin,
    className,
  } = props;

  /**
   * hasPermission is a boolean. It will go through the permissions object to
   * try and find the corresponding key. If it's not found, the user will no have
   * permissions. If no permission requirement is passed to <Button /> it will
   * always default to true.
   */
  const hasPermission = permission
    ? Boolean(userPermissions[permission])
    : true;

  const largeOrBigger = size === 'large' || size === 'xlarge';
  const isDisabled = disabled || !hasPermission || isSubmitting;
  const isNotDisabled = !isDisabled;
  const showDefaultStyles = !disabled;
  const spinnerSize = largeOrBigger ? 21 : 16;
  const strokeWidth = largeOrBigger ? 6 : 7;
  const requiredPermission = gacPermissions.find(
    gacPerm => gacPerm.name === permission,
  );

  /**
   * If the button is within a submitting state we'll display the Spinner component.
   * Otherwise default to the button text if the button is not submitting.
   */

  const spinnerColor =
    appearance !== 'primary'
      ? appearance === 'default' ? '#262626' : '#448aff'
      : '#fff';

  const buttonText = isSubmitting ? (
    <Spinner
      color={spinnerColor}
      strokeWidth={strokeWidth}
      size={spinnerSize}
    />
  ) : (
    text
  );

  // If the button is disabled make sure onClick receives no function
  const handleClick =
    typeof onClick === 'function' && isNotDisabled ? onClick : () => {};

  // Go through the different button options object and return the correct styled component
  const GeneratedButton = Buttons[appearance];
  return (
    <ButtonContainer width={width} margin={margin} className={className}>
      <GeneratedButton
        type={type || 'submit'}
        disabled={isDisabled}
        hasPermission={hasPermission}
        onClick={handleClick}
        id={id}
        size={size}
        width={width}
        showDefaultStyles={showDefaultStyles}
      >
        {buttonText}
      </GeneratedButton>
      {!hasPermission && (
        <ButtonPermissionTooltip permission={requiredPermission || {}} />
      )}
    </ButtonContainer>
  );
};

/**
 * defaultProps will render a small <Button /> in case you forget to
 * pass in the required props.
 */
Button.defaultProps = {
  disabled: false,
  text: 'text prop is missing',
  onClick: undefined,
  isSubmitting: false,
  userPermissions: [],
  gacPermissions: [],
  permission: '',
  appearance: 'primary',
  size: 'small',
  type: 'submit',
};

Button.propTypes = {
  disabled: PropTypes.bool,

  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  isSubmitting: PropTypes.bool,
  userPermissions: permissionsPropType,
  gacPermissions: PropTypes.arrayOf(PropTypes.object),
  permission: PropTypes.string,
  appearance: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

const mapStateToProps = state => ({
  userPermissions: state.permissions && state.permissions.permissions,
  gacPermissions: state.users.permissions,
});

export default connect(mapStateToProps)(Button);
